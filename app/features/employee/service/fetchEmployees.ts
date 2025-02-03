/**
 * fetchEmployees.ts
 * Created On : 2025-29-01 16
 * Author : Sumit Kumar Shrestha
 * Description : This service fetches the list of employees from the server. It uses the `apiRequest` utility
 * for making the API call to the `/employees` endpoint and ensures consistent error handling.
 * Returns a promise that resolves to an array of `Employee` objects.
 */
import { getUserEmail } from "~/common/utils/getUserEmail";
import { apiRequest } from "../../../common/api/backendApi";
import type { Employee } from "../types/employee";
const emailCompany = getUserEmail();

export const fetchEmployees = async (): Promise<Employee[]> => {
  if(!emailCompany){
    throw new Error("No user email found in local storage.")
  }
  try {
    // return await apiRequest(`/employees?emailCompany=${emailCompany}`);
    return await apiRequest(`/employees?emailCompany=${emailCompany}`);
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
