// src/api/users/index.ts
import { Hono } from "hono";
import { sendEmail } from "./controller";
import { init as loggerInit } from "../../middleware/logger";

const notificationApp = new Hono();

notificationApp.use(loggerInit());
console.log("Notification App Initialized");
notificationApp.post("/emails", sendEmail); // POST /api/notifications/emails

export default notificationApp;
