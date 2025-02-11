#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { BackendStack } from "../lib/backend-stack";
import { ParameterStack } from "../lib/parameter-stack";
import { RdsStack } from "../lib/rds-stack";

const app = new cdk.App();

// ParameterStack の作成（例: API 用パラメータ）
const parameterStack = new ParameterStack(app, "ParameterStack");

// RDS スタックの作成
const rdsStack = new RdsStack(app, "RdsStack");

// BackendStack へ RDS の情報を props として渡す
new BackendStack(app, "BackendStack", {
  frontendUrlParameter: parameterStack.frontendUrlParameter,
  databaseCluster: rdsStack.cluster,
  vpc: rdsStack.vpc,
  sg: rdsStack.lambdaSG,
});
