// src/api/axiosInstance.js
import axios from "axios";

import { apiUrl } from "../config/BaseConfig";

// axiosのインスタンスを作成
const axiosInstance = axios.create({
  baseURL: apiUrl || "http://your-backend-api-url", // 環境変数で設定することも可能
  timeout: 10000, // タイムアウト時間（ミリ秒）
  headers: {
    "Content-Type": "application/json",
  },
});

// リクエスト前の処理（例: 認証トークンの付与）
axiosInstance.interceptors.request.use(
  (config) => {
    // 必要であればここでトークンなどをヘッダーに追加
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // リクエストエラー時の処理
    return Promise.reject(error);
  }
);

// レスポンスの共通処理
axiosInstance.interceptors.response.use(
  (response) => {
    // レスポンスデータの整形などを行う
    return response;
  },
  (error) => {
    // エラーハンドリング（例: 認証エラー、ネットワークエラーなど）
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
