import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/aws-lambda";
import dotenv from "dotenv";

dotenv.config();

const app = new Hono();

// すべてのルートに対して CORS ミドルウェアを適用
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL as string],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (c) => c.json({ message: "Hello, World!" }));

export const handler = handle(app);
