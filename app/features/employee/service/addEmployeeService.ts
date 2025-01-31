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

import { apiRequest } from "../../../common/api/backendApi";
import type { Employee } from "../types/employee";

export const addEmployee = async (
  employee: Employee,
  userEmail: string
): Promise<Employee> => {
  try {
    // Send the employee data and userEmail in the body
    const response = await apiRequest("/employee", {
      method: "POST",
      body: { employee, userEmail }, // apiRequest already handles the serialization
    });

    // Assuming the backend returns the created employee object
    return response;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};
