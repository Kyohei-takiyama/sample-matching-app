// src/api/users/index.ts
import { Hono } from "hono";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  checkExistedUser,
} from "./controller";

const userApp = new Hono();

userApp.get("/", getAllUsers); // GET /api/users
userApp.get("/:id", getUserById); // GET /api/users/:id
userApp.post("/", createUser); // POST /api/users
userApp.post("/check", checkExistedUser); // DELETE /api/users/:id
userApp.put("/:id", updateUser); // PUT /api/users/:id
userApp.delete("/:id", deleteUser); // DELETE /api/users/:id

export default userApp;
