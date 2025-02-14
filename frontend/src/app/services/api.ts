// src/utils/api.ts
import apiClient from "./axiosClient";
import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../types/api";

/**
 * 汎用のGETリクエストラッパー
 */
export async function get<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient.get<T>(url, config);
    return { data: response.data };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

/**
 * 汎用のPOSTリクエストラッパー
 */
export async function post<T, P>(
  url: string,
  payload: P,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient.post<T>(url, payload, config);
    return { data: response.data };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// PUT や DELETE も同様にラッパー関数を定義できます
