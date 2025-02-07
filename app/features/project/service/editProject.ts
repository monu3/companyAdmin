/**
 * editProject.ts
 * Created On : 2025-06-02 10
 * Author : Diwash Pokhrel
 * Description : 
 */
import { apiRequest } from "../../../common/api/backendApi";
import type { projectDetails } from "../types";

export const updateProjectService = async (
  id: number,
  updatedData: Partial<projectDetails>
): Promise<projectDetails> => {
  try {
    return await apiRequest(`/project/${id}`, {
      method: "PUT",
      body: updatedData,
    });
  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error);
    throw error;
  }
};
