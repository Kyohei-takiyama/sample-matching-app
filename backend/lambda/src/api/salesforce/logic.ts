import axios from "axios";
import { SalesforceExternalUserPayload } from "./type";

export const getSalesforceAccessToken = async () => {
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
