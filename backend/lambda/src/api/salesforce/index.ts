// src/api/users/index.ts
import { Hono } from "hono";
import { createSalesforceUser, createSalesforceLead } from "./controller";

const sfIntegrationApp = new Hono();

sfIntegrationApp.post("/external-users", createSalesforceUser); // POST /api/salesforce/external-users
sfIntegrationApp.post("/leads", createSalesforceLead); // POST /api/salesforce/leads

export default sfIntegrationApp;
