// src/services/authService.ts
import { post } from "./api";
import {
  SignInPayload,
  CognitoUser,
  SignUpPayload,
  AuthTokens,
} from "../../types/auth";
import { ApiResponse } from "../../types/api";

/**
 * サインアップAPI呼び出しの例
 */
export async function signUp(
  payload: SignUpPayload
): Promise<ApiResponse<AuthTokens>> {
  return await post<AuthTokens, SignUpPayload>("/auth/signup", payload);
}

/**
 * サインインAPI呼び出しの例
 */
export async function signIn(
  payload: SignInPayload
): Promise<ApiResponse<CognitoUser>> {
  return await post<CognitoUser, SignInPayload>("/auth/signin", payload);
}
