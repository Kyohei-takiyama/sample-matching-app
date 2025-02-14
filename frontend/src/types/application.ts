// src/types/application.ts

/**
 * 応募状態の列挙型
 */
export type ApplicationStatus =
  | "APPLIED"
  | "IN_REVIEW"
  | "ACCEPTED"
  | "REJECTED";

export interface Application {
  id: number;
  userId: number;
  jobOpportunityId: number;
  status: ApplicationStatus;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}
