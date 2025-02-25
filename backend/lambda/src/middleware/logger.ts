import { MiddlewareHandler } from "hono";
import { v4 as uuidv4 } from "uuid";
import { AppLogger } from "./AppLogger";

export const init = (): MiddlewareHandler => {
  return async (c, next) => {
    const logger = new AppLogger({
      requestId: uuidv4(),
    });
    c.set("services", { logger });
    logger.info("[Request Started]");
    await next();
    // 必要なら、リクエスト終了時のログもここで出力可能
  };
};
