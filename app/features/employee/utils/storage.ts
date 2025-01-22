import type { Employee } from "../types/employee";

export const getStoredEmployees = () => {
    const storedEmployees = localStorage.getItem("employeeList");
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  };
  
  export const saveEmployeesToStorage = (employees: Employee[]) => {
    localStorage.setItem("employeeList", JSON.stringify(employees));
  };