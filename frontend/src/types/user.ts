// src/types/user.ts
import { Application } from "./application";
import { Favorite } from "./favorite";

export interface User {
  id: number;
  cognitoUserId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  skills?: string;
  experience?: string;
  createdAt: string; // ISO形式の日付文字列
  updatedAt: string;
  applications?: Application[];
  favorites?: Favorite[];
}
