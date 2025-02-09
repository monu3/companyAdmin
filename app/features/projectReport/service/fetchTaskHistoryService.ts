/**
 * taskHistoryService.ts
 * Created On : 2025-08-02
 * Author : Diwash Pokhrel
 * Description : This service fetches the task history data from the server. It uses the `apiRequest` utility
 * for making the API call to the `/task-history` endpoint and ensures consistent error handling.
 * Returns a promise that resolves to an array of `TaskHistory` objects.
 */

import { apiRequest } from "../../../common/api/backendApi";
import { getUserEmail } from "~/common/utils/getUserEmail";
import type { TaskHistory } from "../types/taksHistory";

const emailCompany = getUserEmail();

export const fetchTaskHistory = async (): Promise<TaskHistory[]> => {
  if (!emailCompany) {
    throw new Error("No user email found in local storage.");
  }
  try {
    return await apiRequest(`/task-history?emailCompany=${emailCompany}`);
  } catch (error) {
    console.error("Error fetching task history:", error);
    throw error;
  }
};
