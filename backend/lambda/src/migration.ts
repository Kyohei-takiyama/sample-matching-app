import { execSync } from "child_process";
import {
  CdkCustomResourceHandler,
  CdkCustomResourceResponse,
} from "aws-lambda";
import { v4 as uuidv4 } from "uuid";

export const handler: CdkCustomResourceHandler = async (event) => {
  // 物理リソースIDを、リクエストプロパティから取得、なければ新規に生成
  const physicalResourceId =
    event.ResourceProperties.physicalResourceId ?? uuidv4();

  // DELETE リクエストの場合は何もせず終了
  if (event.RequestType === "Delete") {
    return {
      PhysicalResourceId: physicalResourceId,
    };
  }

  // DATABASE_URL 環境変数が設定されているかチェック
  if (!process.env.DATABASE_URL) {
    throw new Error("DB_CONNECTION is not set");
  }

  // マイグレーションが成功するまで 10 秒ごとに再試行する
  return new Promise<CdkCustomResourceResponse>((resolve) => {
    const intervalId = setInterval(() => {
      try {
        // prisma migrate deploy コマンドを実行
        const stdout = execSync(`prisma migrate deploy`, {
          env: {
            ...process.env,
            DATABASE_URL: process.env.DATABASE_URL,
          },
        });
        console.log(stdout.toString());

        // マイグレーション成功時は interval をクリアし、resolve する
        clearInterval(intervalId);
        resolve({
          PhysicalResourceId: physicalResourceId,
        });
      } catch (error) {
        // エラー発生時はログに出力し、次回再試行
        console.error("Migration is failed %s, will be retry...", error);
      }
    }, 10 * 1000);
  });
};
