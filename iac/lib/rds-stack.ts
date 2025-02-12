// lib/rds-stack.ts
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dotenv from "dotenv";
import path = require("path");
import * as fs from "fs";
import * as cr from "aws-cdk-lib/custom-resources";

// 環境変数の読み込み
dotenv.config();

// 必須の環境変数をチェックするヘルパー関数
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required`);
  }
  return value;
}

export class RdsStack extends cdk.Stack {
  // 後で Lambda の環境変数として利用できるように cluster を公開
  public readonly cluster: rds.DatabaseCluster;
  public readonly vpc: ec2.Vpc;
  public readonly lambdaSG: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 環境変数から値を取得
    const databaseName = requireEnv("RDS_DATABASE_NAME");
    const username = requireEnv("RDS_USERNAME");
    const password = requireEnv("RDS_PASSWORD");

    // VPC の作成
    this.vpc = new ec2.Vpc(this, "AppVpc", {
      maxAzs: 2,
      natGateways: 0,
    });

    // RDS のセキュリティグループ
    const dbSecurityGroup = new ec2.SecurityGroup(this, "DbSecurityGroup", {
      vpc: this.vpc,
      description: "Security group for Aurora MySQL database",
      allowAllOutbound: true,
    });

    // Aurora MySQL クラスターの作成（Serverless V2）
    this.cluster = new rds.DatabaseCluster(this, "AppDatabase", {
      engine: rds.DatabaseClusterEngine.auroraMysql({
        version: rds.AuroraMysqlEngineVersion.VER_3_07_1,
      }),
      serverlessV2MinCapacity: 0.5,
      serverlessV2MaxCapacity: 1,
      credentials: rds.Credentials.fromPassword(
        username,
        cdk.SecretValue.unsafePlainText(password)
      ),
      writer: rds.ClusterInstance.serverlessV2("writer", {
        autoMinorVersionUpgrade: false,
        instanceIdentifier: "app-db-writer",
        publiclyAccessible: false,
      }),
      vpc: this.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      securityGroups: [dbSecurityGroup],
      defaultDatabaseName: databaseName,
      backup: {
        retention: cdk.Duration.days(7),
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY, // 本番環境では注意
      enableDataApi: true,
    });

    // クラスターの接続情報を出力
    new cdk.CfnOutput(this, "DatabaseEndpoint", {
      value: this.cluster.clusterEndpoint.socketAddress,
      description: "Aurora MySQL cluster endpoint",
    });

    // Lambda関数のセキュリティグループ
    this.lambdaSG = new ec2.SecurityGroup(this, "LambdaSecurityGroup", {
      vpc: this.vpc,
      description: "Security group for Lambda function",
      allowAllOutbound: true,
    });

    // セキュリティグループ間の通信許可
    dbSecurityGroup.addIngressRule(
      this.lambdaSG,
      ec2.Port.tcp(3306),
      "Allow Lambda to access Aurora MySQL"
    );

    // マイグレーション用の Lambda 関数を作成
    const dockerAssetDir = path.join(__dirname, "../../backend/lambda/src");
    const migrationLambda = new lambda.DockerImageFunction(
      this,
      "MigrationLambda",
      {
        code: lambda.DockerImageCode.fromImageAsset(dockerAssetDir, {
          file: "Dockerfile",
          cmd: ["migration.handler"],
        }),
        vpc: this.vpc,
        vpcSubnets: {
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
        securityGroups: [this.lambdaSG],
        environment: {
          DATABASE_URL: `mysql://${username}:${password}@${this.cluster.clusterEndpoint.hostname}:${this.cluster.clusterEndpoint.port}/${databaseName}`,
        },
        timeout: cdk.Duration.minutes(15),
        memorySize: 1024,
        architecture: lambda.Architecture.ARM_64,
      }
    );

    // 最新のマイグレーションファイル名を取得
    const migrationsDir = path.join(
      __dirname,
      "../../backend/lambda/src/prisma/migrations"
    );
    const latestMigration = fs
      .readdirSync(migrationsDir)
      .filter((file) => file !== "migration_lock.toml")
      .sort((a, b) => b.localeCompare(a))[0];

    console.log(latestMigration);

    // カスタムリソースプロバイダーの作成
    const provider = new cr.Provider(this, "MigrationProvider", {
      onEventHandler: migrationLambda,
    });

    // カスタムリソースの作成
    const migrationCustomResource = new cdk.CustomResource(
      this,
      "MigrationCustomResource",
      {
        serviceToken: provider.serviceToken,
        properties: {
          latestMigration: latestMigration,
        },
      }
    );

    // 明示的な依存関係の追加
    migrationCustomResource.node.addDependency(this.cluster);
  }
}
