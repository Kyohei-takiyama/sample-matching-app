// lib/backend-stack.ts
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ssm from "aws-cdk-lib/aws-ssm";
import * as rds from "aws-cdk-lib/aws-rds";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export interface BackendStackProps extends cdk.StackProps {
  frontendUrlParameter: ssm.IStringParameter;
  databaseCluster: rds.IDatabaseCluster;
  vpc: ec2.IVpc;
  sg: ec2.ISecurityGroup;
}

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BackendStackProps) {
    super(scope, id, props);

    const clusterEndpoint = props.databaseCluster.clusterEndpoint;
    const username = process.env.RDS_USERNAME!;
    const password = process.env.RDS_PASSWORD!;
    const databaseName = process.env.RDS_DATABASE_NAME!;
    const DATABASE_URL = `mysql://${username}:${password}@${clusterEndpoint.hostname}:${clusterEndpoint.port}/${databaseName}`;
    console.log(`DATABASE_URL: ${DATABASE_URL}`);

    const fn = new NodejsFunction(this, "lambda", {
      entry: "../backend/lambda/index.ts",
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_20_X,
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      securityGroups: [props.sg],
      environment: {
        DATABASE_URL,
      },

      architecture: lambda.Architecture.ARM_64,
      bundling: {
        // commandHooksでインストール前、バンドル前、後にコマンドを組み込める
        commandHooks: {
          beforeInstall(inputDir: string, outputDir: string): string[] {
            return [``];
          },
          beforeBundling(inputDir: string, outputDir: string): string[] {
            return [``];
          },
          afterBundling(inputDir: string, outputDir: string): string[] {
            return [
              // クエリエンジンを追加
              `cp ${inputDir}/node_modules/.prisma/client/libquery_engine-linux-arm64-* ${outputDir}`,
              // スキーマ定義を追加
              `cp ${inputDir}/backend/lambda/src/prisma/schema.prisma ${outputDir}`,
            ];
          },
        },
      },
    });

    fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    // ParameterStack で作成したパラメータの ARN を利用して IAM ポリシーを追加
    fn.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["ssm:GetParameter"],
        resources: [props.frontendUrlParameter.parameterArn],
      })
    );

    new apigw.LambdaRestApi(this, "sample-matching-api", {
      handler: fn,
    });
  }
}
