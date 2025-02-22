import { post } from "./api";
import { ApiResponse } from "../../types/api";
import { SalesforceLeadPayload } from "../../types/salesforce";

const BASE_API_PATH = "/api/salesforce";

/**
 * Salesforce API のレスポンス
 */

export async function createLead(
  payload: SalesforceLeadPayload
): Promise<ApiResponse<void>> {
  return await post<void, SalesforceLeadPayload>(
    `${BASE_API_PATH}/leads`,
    payload
  );
}
