import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";

const prisma = new PrismaClient();
const app = new Hono();

// 全ユーザー取得: GET /users
app.get("/", async (c) => {
  try {
    const users = await prisma.user.findMany();
    return c.json(users);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500);
  }
});

// 単体ユーザー取得: GET /:id
app.get("/:id", async (c) => {
  // HONO のルートパラメータは c.req.param() で取得可能
  const id = parseInt(c.req.param("id"));
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      return c.json(user);
    } else {
      return c.json({ error: "User not found" }, 404);
    }
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500);
  }
});

// ユーザー作成: POST
app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const {
      cognitoUserId,
      firstName,
      lastName,
      email,
      phone,
      skills,
      experience,
    } = body;
    const newUser = await prisma.user.create({
      data: {
        cognitoUserId,
        firstName,
        lastName,
        email,
        phone,
        skills,
        experience,
      },
    });
    return c.json(newUser, 201);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500);
  }
});

// ユーザー更新: PUT /:id
app.put("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  try {
    const body = await c.req.json();
    const { firstName, lastName, email, phone, skills, experience } = body;
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { firstName, lastName, email, phone, skills, experience },
    });
    return c.json(updatedUser);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500);
  }
});

// ユーザー削除: DELETE /:id
app.delete("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  try {
    const deletedUser = await prisma.user.delete({ where: { id } });
    return c.json(deletedUser);
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500);
  }
});

export default app;
