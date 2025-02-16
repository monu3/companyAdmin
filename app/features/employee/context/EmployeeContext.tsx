import React, { createContext, useContext, useState, useEffect } from "react";
import { getStoredEmployees, saveEmployeesToStorage } from "../utils/storage";
import type { EmployeeContextProps, Employee } from "../types/employee";
import { fetchEmployees } from "../service/fetchEmployees";
import { deleteEmployeeService } from "../service/deleteEmployeeService";
import ToastService from "~/common/utils/toastService";
import { isAuthenticated } from "~/features/auth/auth";
import { useAuth } from "~/features/loginAndLogoutAuth/context/authContext";

const EmployeeContext = createContext<EmployeeContextProps | undefined>(
  undefined
);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const defaultEmployeeDetails: Employee[] = [];
  const [employees, setEmployees] = useState<Employee[]>(
    defaultEmployeeDetails
  );
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [view, setView] = useState<"table" | "card">("table");

  const { isAuthenticated } = useAuth();

  const updateEmployee = (selectedId: string) => {
    // Find the empolyee you want to edit based on the selectedId
    const employeeToEdit = employees.find((item) => item.id === selectedId);

    // If employee is found, set it as selectedEmployee and open the modal for editing
    if (employeeToEdit) {
      setSelectedEmployee(employeeToEdit);
      setIsOpen(true); // Open the form for editing
    }
  };

  // const deleteEmployee = (id: string) => {
  //   console.log("Data before delete:", employees);

  //   const filteredData = employees.filter(item => item.id !== id);

  //   if (filteredData.length === employees.length) {
  //     console.warn(`No item found with id: ${id}`);
  //     return; // Exit if no item is deleted
  //   }
  //   deleteEmployeeService(id);
  //   // setEmployees(filteredData);

  //   console.log("Selected ID:", id);
  //   console.log("Data after delete:", filteredData);
  // };

  const deleteEmployee = async (id: string) => {
    try {
      await deleteEmployeeService(id);
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
      ToastService.success("Deleted Successfully", 500);
    } catch (error) {
      console.error(`Error deleting employee with ID ${id}:`, error);
      ToastService.error("Failed to delete", 500);
    }
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined" && employees.length > 0) {
  //     localStorage.setItem("employees", JSON.stringify(employees));
  //   }
  // }, [employees]);

  const fetchAndSetEmployees = async () => {
    try {
      const storedData = await fetchEmployees(); // Assuming this is an API call
      if (storedData) {
        setEmployees(storedData); // Assuming storedData is already JSON
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAndSetEmployees();
    }
  }, [isAuthenticated]);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        setEmployees,
        isOpen,
        setIsOpen,
        view,
        setView,
        updateEmployee,
        deleteEmployee,
        selectedEmployee,
        setSelectedEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context)
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider"
    );
  return context;
};
