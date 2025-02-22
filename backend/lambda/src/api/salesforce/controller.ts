import { Context } from "hono";
import {
  SalesforceExternalLeadPayload,
  SalesforceExternalUserPayload,
} from "./type";
import { createExternalUser, createLead } from "./logic";

export const createSalesforceUser = async (c: Context) => {
  try {
    const userPayload = (await c.req.json()) as SalesforceExternalUserPayload;
    const createdUser = await createExternalUser(userPayload);
    return c.json(createdUser, 201);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};

export const createSalesforceLead = async (c: Context) => {
  try {
    const leadPayload = (await c.req.json()) as SalesforceExternalLeadPayload;
    const createdLead = await createLead(leadPayload);
    return c.json(createdLead, 201);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};
