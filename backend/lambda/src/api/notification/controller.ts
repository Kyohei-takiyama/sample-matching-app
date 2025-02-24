import { Context } from "hono";
import { sendEmail as sendEmailLogic } from "./logic";

export const sendEmail = async (c: Context) => {
  try {
    const emailPayload = (await c.req.json()) as EmailPayload;
    sendEmailLogic(emailPayload);
    return c.json({ message: "Email sent successed" }, 201);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};
