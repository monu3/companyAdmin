// taskService.ts
import { apiRequest } from "~/common/api/backendApi";
import type { Task, TaskStatus } from "../Types/types";
import { getUserEmail } from "~/common/utils/getUserEmail";

const emailCompany = getUserEmail();

// Function to create or update a task
export const saveTask = async (task: Task): Promise<any> => {
  if (!emailCompany) {
    throw new Error("No user email found in local storage.");
  }

  // If task has an ID, it's likely an update, so use PUT instead of POST
  const method = task.id ? "PUT" : "POST";
  const projectId = task.projectId;
  console.log("tasks: ", task);
  // console.log("method: ", method);
  // console.log("Taks id: ",task.id)
  const body = task.id ? { ...task } : { task, projectId, emailCompany };
  // console.log("body:", body);
  // console.log("tasks service page: ", task);

  const endpoint = task.id ? `/tasks/${task.id}` : "/tasks"; // Update URL if ID is provided

  // console.log("endpoint: ", endpoint);
  return await apiRequest(endpoint, {
    method,
    body,
  });
};

// services/taskService.ts
export const fetchTasks = async (): Promise<Task[]> => {
  if (!emailCompany) {
    throw new Error("No user email found in local storage.");
  }

  try {
    const tasks = await apiRequest(`/tasks?emailCompany=${emailCompany}`);
    return tasks; // Return the tasks fetched from the backend
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const updateTaskStatus = async (taskId: string, newStatus: string) => {
  try {
    const taskIdAsNumber = Number(taskId);
    // console.log("status: ", newStatus);
    // Make the API request to update the task status in the backend
    const response = await apiRequest(`/tasks/${taskIdAsNumber}/status`, {
      method: "PUT",
      body: { status: newStatus },
    });

    // Return the updated task (optional, depending on your backend)
    return response;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

// Delete a task by its ID
export const deleteTask = async (taskId: string): Promise<any> => {
  if (!taskId) {
    throw new Error("Task ID is required for deletion.");
  }

  const endpoint = `/tasks/${taskId}`;

  try {
    return await apiRequest(endpoint, {
      method: "DELETE",
    });
  } catch (error) {
    throw new Error(`Error deleting task: ${error}`);
  }
};
