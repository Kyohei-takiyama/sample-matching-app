// src/types/contact.ts
import { Company } from "./company";

export interface Contact {
  id: number;
  companyId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position?: string; // 役職や部署など
  createdAt: string;
  updatedAt: string;
  company?: Company;
}
