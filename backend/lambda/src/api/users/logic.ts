// src/api/users/logic.ts
import { createExternalUser } from "../salesforce/logic";
import { SalesforceExternalUserPayload } from "../salesforce/type";
import {
  getUserModel,
  getAllUsersModel,
  createUserModel,
  updateUserModel,
  deleteUserModel,
  getUserByEmailModel,
} from "./model";

export async function fetchAllUsers() {
  return await getAllUsersModel();
}

export async function fetchUserById(id: number) {
  if (!id) throw new Error("User ID is required");
  return await getUserModel(id);
}

export async function addUser(userData: any) {
  // 必須フィールドのバリデーション例
  if (!userData.email || !userData.firstName || !userData.lastName) {
    throw new Error("Missing required fields");
  }

  const createdUser = await createUserModel(userData);

  // Salesforce への連携を行う
  const createUserPayload: SalesforceExternalUserPayload = {
    id: createdUser.id,
    firstName: createdUser.firstName,
    lastName: createdUser.lastName,
    email: createdUser.email,
    phone: createdUser.phone || "",
    experience: createdUser.experience || "",
    createdAt: createdUser.createdAt.toISOString(),
    updatedAt: createdUser.updatedAt.toISOString(),
  };
  createExternalUser(createUserPayload);

  return createdUser;
}

export async function modifyUser(id: number, userData: any) {
  if (!id) throw new Error("User ID is required");
  return await updateUserModel(id, userData);
}

export async function removeUser(id: number) {
  if (!id) throw new Error("User ID is required");
  return await deleteUserModel(id);
}

export async function fetchUserByEmail(email: string) {
  if (!email) throw new Error("Email is required");
  return await getUserByEmailModel(email);
}
