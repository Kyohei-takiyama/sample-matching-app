// src/types/jobOpportunity.ts
import { Application } from "./application";
import { Favorite } from "./favorite";
import { Company } from "./company";

export interface JobOpportunity {
  id: number;
  title: string;
  description: string;
  skillsRequired?: string;
  location?: string;
  compensation?: string;
  createdAt: string;
  updatedAt: string;
  companyId: number;
  company?: Company;
  applications?: Application[];
  favorites?: Favorite[];
}
