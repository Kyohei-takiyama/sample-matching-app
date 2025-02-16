// src/api/users/index.ts
import { Hono } from "hono";
import { createSalesforceUser } from "./controller";

const sfIntegrationApp = new Hono();

sfIntegrationApp.post("/external-users", createSalesforceUser); // POST /api/salesforce/external-users

export default sfIntegrationApp;
