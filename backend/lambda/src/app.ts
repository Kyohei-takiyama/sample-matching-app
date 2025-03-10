// src/app.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { handle, LambdaContext, LambdaEvent } from "hono/aws-lambda";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import userApp from "./api/users";
import salesforceApp from "./api/salesforce";
import notificationApp from "./api/notification";
import { init as loggerInit } from "./middleware/logger";

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

const baseUrl = process.env.SALESFORCE_URL;
const clientId = process.env.SF_CLIENT_ID;
const clientSecret = process.env.SF_CLIENT_SECRET;

console.log("Salesforce URL:", baseUrl);
console.log("Salesforce Client ID:", clientId);
console.log("Salesforce Client Secret:", clientSecret);

// Hono アプリケーションの初期化（起動時に Parameter 取得）
async function createApp(): Promise<Hono> {
  const frontendUrl = await getFrontendUrl();

  console.log("Frontend URL:", frontendUrl);

  const app = new Hono();

  // ログの設定
  app.use(loggerInit());

  // CORS ミドルウェアに localhost と Parameter Store から取得した URL を設定
  app.use(
    "*",
    cors({
      origin: ["http://localhost", frontendUrl],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.get("/", (c) => c.json({ message: "Hello, World!" }));

  // /api/users 以下のリクエストは userApp にルーティング
  app.route("/api/users", userApp);

  // /api/salesforce 以下のリクエストは salesforceApp にルーティング
  app.route("/api/salesforce", salesforceApp);

  // /api/notifications 以下のリクエストは notificationApp にルーティング
  app.route("/api/notifications", notificationApp);

  return app;
}

// if (import.meta.main) {
//   const Bun = await import("bun");
//   const app = await createApp();
//   // PORT 環境変数があればそれを使い、なければ 5000 番ポートで起動
//   const port = Number(process.env.PORT) || 5050;
//   console.log(`Starting server on http://localhost:${port}`);
//   Bun.serve({
//     fetch: app.fetch, // Hono アプリの fetch ハンドラを渡す
//     port,
//   });
// }

// Lambda ハンドラー（Hono の handle をラップ）
export const handler = async (event: LambdaEvent, context: LambdaContext) => {
  const app = await createApp();
  return handle(app)(event, context);
};
