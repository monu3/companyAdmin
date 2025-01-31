/**
 * fetchEmployees.ts
 * Created On : 2025-29-01 16
 * Author : Diwash Pokhrel
 * Description : This service fetches the list of employees from the server. It uses the `apiRequest` utility
 * for making the API call to the `/employees` endpoint and ensures consistent error handling.
 * Returns a promise that resolves to an array of `Employee` objects.
 */
import { apiRequest } from "../../../common/api/backendApi";
import type { Employee } from "../types/employee";

export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    return await apiRequest("/employees");
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
