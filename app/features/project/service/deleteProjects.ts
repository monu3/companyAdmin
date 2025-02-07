
import { apiRequest } from "../../../common/api/backendApi";

export const deleteProject = async (id: string): Promise<void> => {
  try {
    await apiRequest(`/project/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    throw error;
  }
};