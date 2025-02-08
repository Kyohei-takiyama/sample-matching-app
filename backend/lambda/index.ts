// src/backend.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle, LambdaContext, LambdaEvent } from "hono/aws-lambda";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

// SSM Client を作成（リージョンは Lambda の実行環境に合わせる）
const ssmClient = new SSMClient({
  region: process.env.AWS_REGION || "ap-northeast-1",
});

// Parameter Store から FRONTEND_URL を取得する非同期関数
async function getFrontendUrl(): Promise<string> {
  const command = new GetParameterCommand({
    Name: "/development/sample_matching_app/frontend_url", // CDK で作成したパラメータ名
    WithDecryption: false, // 暗号化パラメータの場合は true にする
  });
  const response = await ssmClient.send(command);
  return response.Parameter?.Value || "";
}

// Hono アプリケーションの初期化（起動時に Parameter 取得）
async function createApp(): Promise<Hono> {
  const frontendUrl = await getFrontendUrl();

  console.log("Frontend URL:", frontendUrl);

  const app = new Hono();

  // CORS ミドルウェアに localhost と Parameter Store から取得した URL を設定
  app.use(
    "*",
    cors({
      origin: ["http://localhost:3000", frontendUrl],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.get("/", (c) => c.json({ message: "Hello, World!" }));

  return app;
}

// createApp の Promise を作成（Lambda のコールドスタート時に1度だけ実行）
const appPromise = createApp();

// Lambda ハンドラー（Hono の handle をラップ）
export const handler = async (event: LambdaEvent, context: LambdaContext) => {
  const app = await appPromise;
  return handle(app)(event, context);
};
