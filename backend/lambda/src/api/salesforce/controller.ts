import { Context } from "hono";
import { SalesforceExternalUserPayload } from "./type";
import { createExternalUser } from "./logic";

export const createSalesforceUser = async (c: Context) => {
  try {
    const userPayload = (await c.req.json()) as SalesforceExternalUserPayload;
    const createdUser = await createExternalUser(userPayload);
    return c.json(createdUser, 201);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};
