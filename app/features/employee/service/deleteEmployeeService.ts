/**
 * deleteEmployeeService.ts
 * Created On : 2025-29-01 16
 * Author : Diwash Pokhrel
 * Description : This service function provides an API integration for deleting an employee record by ID.
 * It sends a DELETE request to the backend API using the provided `id` to remove the employee from the database.
 * It also includes error handling to manage API failures effectively.
 */
import { apiRequest } from "../../../common/api/backendApi";

export const deleteEmployeeService = async (id: string): Promise<void> => {
  try {
    await apiRequest(`/employees/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error);
    throw error;
  }
};
