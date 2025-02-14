// src/services/authService.ts
import { post } from "./api";
import { SignInPayload } from "../../types/auth";
import { ApiResponse } from "../../types/api";
import { User } from "../../types/user";

/**
 * サインアップAPI呼び出しの例
 */
export async function signUp(
  payload: SignInPayload
): Promise<ApiResponse<User>> {
  return await post<User, SignInPayload>("/auth/signup", payload);
}
