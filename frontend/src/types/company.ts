// src/types/company.ts
import { Contact } from "./contact";
import { JobOpportunity } from "./jobOpportunity";

export interface Company {
  id: number;
  name: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
  contacts?: Contact[];
  jobOpportunities?: JobOpportunity[];
}
