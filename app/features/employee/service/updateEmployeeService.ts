/**
 * updateEmployeeService.ts
 * Created On : 2025-29-01 16
 * Author : Diwash Pokhrel
 * Description : This service updates the details of a specific employee on the server.
 * It accepts the employee's ID and a partial `Employee` object containing the updated data.
 * Uses the `apiRequest` utility to send a PUT request to the `/employees/:id` endpoint.
 * Returns a promise that resolves to the updated `Employee` object.
 */
import { apiRequest } from "../../../common/api/backendApi";
import type { Employee } from "../types/employee";

export const updateEmployeeService = async (
  id: string,
  updatedData: Partial<Employee>
): Promise<Employee> => {
  try {
    return await apiRequest(`/employees/${id}`, {
      method: "PUT",
      body: updatedData,
    });
  } catch (error) {
    console.error(`Error updating employee with ID ${id}:`, error);
    throw error;
  }
};
