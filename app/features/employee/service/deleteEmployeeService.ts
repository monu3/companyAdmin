import { apiRequest } from "../../../common/api/backendApi";

export const deleteEmployeeService = async (id: string): Promise<void> => {
  try {
    await apiRequest(`/employees/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error);
    throw error;
  }
};
