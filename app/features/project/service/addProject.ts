/**
 * addProject.ts
 * Created On : 2025-05-02 12
 * Author : Diwash Pokhrel
 * Description :
 */

import { getUserEmail } from "~/common/utils/getUserEmail";
import { apiRequest } from "../../../common/api/backendApi";
import type { Company } from "~/features/profile/types/types";
import type { projectDetails } from "../types";
export const addProject = async (
  project: projectDetails
): Promise<projectDetails> => {
  try {
    const userEmail = getUserEmail();
    const clientId = project.clientId;
    console.log("formData from project service page: ", project);
    const response = await apiRequest("/addProjectDetails", {
      method: "POST",
      body: { project, clientId, userEmail },
      //   body: { project, userEmail },
    });
    return response;
  } catch (error) {
    console.error("Error adding projectDetails:", error);
    throw new Error("Failed to add project. Please try again.");
  }
};



// Client client

// clientId :number;
