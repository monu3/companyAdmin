import { getUserEmail } from "~/common/utils/getUserEmail";
import { apiRequest } from "../../../common/api/backendApi";
import type {Notification } from "../types/notification";
const emailCompany = getUserEmail();

export const fetchNotification = async (): Promise<Notification[]> => {
  if(!emailCompany){
    throw new Error("No user email found in local storage.")
  }
  try {
    
    return await apiRequest(`/notification?emailCompany=${emailCompany}`);
  } catch (error) {
    console.error("Error fetching notification:", error);
    throw error;
  }
};

// export const resendEmail =async ():Promise<Notification[]> =>{
    
// }