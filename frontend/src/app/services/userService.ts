// src/services/authService.ts
import { post } from "./api";
import { SignInPayload } from "../../types/auth";
import { ApiResponse } from "../../types/api";
import {
  IsExistedCheckPayload,
  IsExistedCheckResponse,
  User,
  UserPayload,
} from "../../types/user";

/**
 * User API のレスポンス
 */
export async function createUser(
  payload: UserPayload
): Promise<ApiResponse<User>> {
  return await post<User, UserPayload>("/api/users", payload);
}

export async function checkIsExitstedUser(
  email: string
): Promise<ApiResponse<IsExistedCheckResponse>> {
  return await post<IsExistedCheckResponse, IsExistedCheckPayload>(
    "/api/users/check",
    { email }
  );
}
