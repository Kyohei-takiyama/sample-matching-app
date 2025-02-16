// src/types/user.ts
import { Application } from "./application";
import { Favorite } from "./favorite";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  skills?: string;
  experience?: string;
  salesforceId?: string;
  createdAt: string; // ISO形式の日付文字列
  updatedAt: string;
  applications?: Application[];
  favorites?: Favorite[];
}

export type UserPayload = Omit<User, "id" | "createdAt" | "updatedAt">;

export type IsExistedCheckPayload = Pick<User, "email">;

export type IsExistedCheckResponse = {
  isExisted: boolean;
};
