import * as path from "path";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as lambdaEventSources from "aws-cdk-lib/aws-lambda-event-sources";
import * as iam from "aws-cdk-lib/aws-iam";

export class NotificationStack extends cdk.Stack {
  public readonly sqsEndpoint: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // SQS キューの作成
    // デフォルトが30秒であり、Lambda関数のタイムアウト以上の値を設定しないといけない
    const emailQueue = new sqs.Queue(this, "EmailQueue", {
      queueName: "emailQueue",
      visibilityTimeout: cdk.Duration.seconds(900),
    });

    const dockerAssetDir = path.join(__dirname, "../../backend/lambda/src");
    const emailSenderLambda = new lambda.DockerImageFunction(
      this,
      "EmailSenderLambda",
      {
        code: lambda.DockerImageCode.fromImageAsset(dockerAssetDir, {
          file: "NotificationDockerfile",
          cmd: ["emailSender.handler"],
        }),
        environment: {
          EMAIL_ORIGIN: process.env.EMAIL_ORIGIN!,
        },
        timeout: cdk.Duration.seconds(900),
        memorySize: 1024,
        architecture: lambda.Architecture.ARM_64,
      }
    );

    // SQS イベントソースとして Lambda を設定
    emailSenderLambda.addEventSource(
      new lambdaEventSources.SqsEventSource(emailQueue)
    );

    // Lambda に SES 送信権限を付与
    emailSenderLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["ses:SendEmail", "ses:SendRawEmail"],
        resources: ["*"], // 必要に応じてリソースを絞り込む
      })
    );

    // SQS キューの URL を出力
    this.sqsEndpoint = emailQueue.queueUrl;
  }
}
