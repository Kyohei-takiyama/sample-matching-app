// src/api/users/controller.ts
import { Context } from "hono";
import {
  fetchAllUsers,
  fetchUserById,
  addUser,
  modifyUser,
  removeUser,
} from "./logic";

export const getAllUsers = async (c: Context) => {
  try {
    const users = await fetchAllUsers();
    return c.json(users);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};

export const getUserById = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  try {
    const user = await fetchUserById(id);
    if (user) {
      return c.json(user);
    }
    return c.json({ error: "User not found" }, 404);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};

export const createUser = async (c: Context) => {
  try {
    const body = await c.req.json();
    const newUser = await addUser(body);
    return c.json(newUser, 201);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};

export const updateUser = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  try {
    const body = await c.req.json();
    const updatedUser = await modifyUser(id, body);
    return c.json(updatedUser);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};

export const deleteUser = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  try {
    const deletedUser = await removeUser(id);
    return c.json(deletedUser);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
};
