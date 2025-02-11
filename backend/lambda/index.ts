import { handler as handle } from "./src/app";

// index.ts で定義された純粋なHTTPサーバをAWS Lambda用のアダプタでラップしてハンドラとしてエクスポート
export const handler = handle;
