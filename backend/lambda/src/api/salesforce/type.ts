export type SalesforceExternalUserPayload = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  experience?: string;
  updatedAt?: string;
  createdAt?: string;
};

export type SalesforceExternalLeadPayload = {
  companyName: string;
  companyUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  recruitmentReason: string;
};
