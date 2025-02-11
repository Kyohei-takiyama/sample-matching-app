// lib/parameter-stack.ts
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ssm from "aws-cdk-lib/aws-ssm";

export class ParameterStack extends cdk.Stack {
  // 生成したパラメータを公開プロパティとして保持
  public readonly frontendUrlParameter: ssm.IStringParameter;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.frontendUrlParameter = new ssm.StringParameter(
      this,
      "FrontendUrlParameter",
      {
        parameterName: "/development/sample_matching_app/frontend_url",
        stringValue: "https://sample-matching-app-frontend-next.vercel.app",
        description: "URL for the frontend application",
      }
    );
  }
}
