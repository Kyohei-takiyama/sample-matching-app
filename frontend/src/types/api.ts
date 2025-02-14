// src/types/api.ts

/**
 * API のレスポンスとして利用する共通の型
 */
export interface ApiResponse<T> {
  data: T | null;
  error?: string;
}
