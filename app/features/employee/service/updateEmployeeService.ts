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
