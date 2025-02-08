#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { BackendStack } from "../lib/backend-stack";
import { ParameterStack } from "../lib/parameter-stack";

const app = new cdk.App();

const parameterStack = new ParameterStack(app, "ParameterStack");

new BackendStack(app, "BackendStack", {
  frontendUrlParameter: parameterStack.frontendUrlParameter,
});
