// src/api/users/logic.ts
import {
  getUserModel,
  getAllUsersModel,
  createUserModel,
  updateUserModel,
  deleteUserModel,
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
  // 他のビジネスルール（例: 重複チェックなど）もここで実施可能
  return await createUserModel(userData);
}

export async function modifyUser(id: number, userData: any) {
  if (!id) throw new Error("User ID is required");
  return await updateUserModel(id, userData);
}

export async function removeUser(id: number) {
  if (!id) throw new Error("User ID is required");
  return await deleteUserModel(id);
}
