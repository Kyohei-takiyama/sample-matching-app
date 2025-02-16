// src/utils/axiosClient.ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// 共通のAxiosインスタンスを作成
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.ENDPOINT_URL || "http://localhost:5050",
  timeout: 10000, // タイムアウトを10秒に設定
});

// リクエストインターセプター: リクエスト送信前に認証トークンを設定
// apiClient.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     // 例: LocalStorage や Context からトークンを取得
//     const token = localStorage.getItem("accessToken");
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // レスポンスインターセプター: 共通エラーハンドリングなど
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // 例: 認証エラー時のリダイレクト処理など
//     if (error.response && error.response.status === 401) {
//       // 必要に応じてログアウト処理やリダイレクト
//       console.error("Unauthorized, redirecting to login...");
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
