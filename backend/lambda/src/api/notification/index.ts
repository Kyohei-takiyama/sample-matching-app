// src/api/users/index.ts
import { Hono } from "hono";
import { sendEmail } from "./controller";

const notificationApp = new Hono();

notificationApp.post("/emails", sendEmail); // POST /api/notifications/emails

export default notificationApp;
