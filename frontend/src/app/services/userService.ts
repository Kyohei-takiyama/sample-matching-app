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

const BASE_API_PATH = "/api/users";

/**
 * User API のレスポンス
 */
export async function createUser(
  payload: UserPayload
): Promise<ApiResponse<User>> {
  return await post<User, UserPayload>(`${BASE_API_PATH}`, payload);
}

export async function checkIsExitstedUser(
  email: string
): Promise<ApiResponse<IsExistedCheckResponse>> {
  return await post<IsExistedCheckResponse, IsExistedCheckPayload>(
    `${BASE_API_PATH}/check`,
    { email }
  );
}
