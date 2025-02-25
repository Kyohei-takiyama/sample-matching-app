export interface AppLoggerOptions {
  requestId: string;
  level?: "debug" | "info" | "warn" | "error";
}

export class AppLogger {
  private requestId: string;
  private level: "debug" | "info" | "warn" | "error";

  constructor(options: AppLoggerOptions) {
    this.requestId = options.requestId;
    this.level = options.level || "info";
  }

  private log(level: string, message: string, meta?: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      requestId: this.requestId,
      message,
      ...(meta && { meta }),
    };
    // CloudWatch は STDOUT からログを収集するので、JSON 形式にして出力するのがおすすめ
    if (level === "error") {
      console.error(JSON.stringify(logEntry));
    } else {
      console.log(JSON.stringify(logEntry));
    }
  }

  debug(message: string, meta?: any) {
    if (this.shouldLog("debug")) {
      this.log("debug", message, meta);
    }
  }

  info(message: string, meta?: any) {
    if (this.shouldLog("info")) {
      this.log("info", message, meta);
    }
  }

  warn(message: string, meta?: any) {
    if (this.shouldLog("warn")) {
      this.log("warn", message, meta);
    }
  }

  error(message: string, meta?: any) {
    if (this.shouldLog("error")) {
      this.log("error", message, meta);
    }
  }

  // 簡単なログレベルのフィルタリング（必要に応じて拡張可能）
  private shouldLog(level: string): boolean {
    const levels: { [key: string]: number } = {
      debug: 10,
      info: 20,
      warn: 30,
      error: 40,
    };
    return levels[level] >= levels[this.level];
  }
}
