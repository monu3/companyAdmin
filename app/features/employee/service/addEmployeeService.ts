/**
 * addEmployeeService.ts
 * Created On : 2025-29-01
 * Author : Diwash Pokhrel
 * Description :
 * This service is responsible for adding a new employee to the system.
 * It accepts an `Employee` object and a `userEmail` to identify the user making the request.
 * The function sends a POST request to the `/employee` endpoint with the employee data and user email.
 * Returns a promise that resolves to the newly created `Employee` object.
 */

import { getUserEmail } from "~/common/utils/getUserEmail";
import { apiRequest } from "../../../common/api/backendApi";
import type { Employee } from "../types/employee";
export const addEmployee = async (employee: Employee): Promise<Employee> => {
  try {
    const userEmail = getUserEmail();
    const response = await apiRequest("/employee", {
      method: "POST",
      body: { employee, userEmail },
    });
    return response;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};
