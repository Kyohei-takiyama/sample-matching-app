import axios from "axios";
import {
  SalesforceExternalLeadPayload,
  SalesforceExternalUserPayload,
} from "./type";

export const getSalesforceAccessToken = async () => {
  // クライアントクレデンシャルフローを使用して Salesforce へのアクセストークンを取得
  const response = await axios.post(
    `${process.env.SALESFORCE_URL}/services/oauth2/token?grant_type=client_credentials&client_id=${process.env.SF_CLIENT_ID}&client_secret=${process.env.SF_CLIENT_SECRET}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (!response.data.access_token) {
    throw new Error("Failed to get Salesforce access token");
  }

  return response.data.access_token;
};

export const createExternalUser = async (
  user: SalesforceExternalUserPayload
) => {
  try {
    const accessToken = await getSalesforceAccessToken();
    const response = await axios.post(
      `${process.env.SALESFORCE_URL}/services/data/v60.0/sobjects/External_User__c`,
      {
        Name: `${user.firstName} ${user.lastName}`,
        External_Id__c: user.id,
        FirstName__c: user.firstName,
        LastName__c: user.lastName,
        Email__c: user.email,
        Phone__c: user.phone,
        Experience__c: user.experience,
        Sync_CreatedAt__c: user.createdAt,
        Sync_UpdatedAt__c: user.updatedAt,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create external user: ${error}`);
  }
};

export const createLead = async (lead: SalesforceExternalLeadPayload) => {
  try {
    const accessToken = await getSalesforceAccessToken();
    const response = await axios.post(
      `${process.env.SALESFORCE_URL}/services/data/v60.0/sobjects/Lead`,
      {
        Company: lead.companyName,
        Website: lead.companyUrl,
        FirstName: lead.firstName,
        LastName: lead.lastName,
        Email: lead.email,
        Phone: lead.phone,
        RecruitmentReason__c: lead.recruitmentReason,
        Status: "Open - Not Contacted",
        LeadSource: "問い合わせフォーム",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // キャンペーンメンバーを作成
    await axios.post(
      `${process.env.SALESFORCE_URL}/services/data/v60.0/sobjects/CampaignMember`,
      {
        CampaignId: process.env.SF_CAMPAIGN_ID,
        LeadId: response.data.id,
        Status: "Sent",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw new Error(
      `Failed to create lead: ${error.response.data[0].errorCode} , ${error.response.data[0].message}}`
    );
  }
};
