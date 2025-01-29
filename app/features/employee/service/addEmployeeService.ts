/**
 * addEmployeeService.ts
 * Created On : 2025-29-01
 * Author : Diwash Pokhrel
 * Description : Service to add an employee by making an API request to the backend.
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
