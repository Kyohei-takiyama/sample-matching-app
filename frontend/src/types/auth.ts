// src/types/auth.ts

/**
 * Cognito認証時に取得する各種トークン
 */
export interface AuthTokens {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
}

/**
 * サインアップ時のリクエストペイロード
 */
export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  skills?: string;
  experience?: string;
}

/**
 * サインイン時のリクエストペイロード
 */
export interface SignInPayload {
  email: string;
  password: string;
}

/**
 * サインアップ／サインイン後に管理するユーザー情報
 */
export interface CognitoUser {
  cognitoUserId: string;
  email: string;
  firstName: string;
  lastName: string;
}
