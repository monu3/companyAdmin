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
