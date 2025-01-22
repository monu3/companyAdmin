import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredEmployees, saveEmployeesToStorage } from '../utils/storage';
import type { Employee } from '../types/employee';

interface EmployeeContextProps {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;
}

const EmployeeContext = createContext<EmployeeContextProps | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    setEmployees(getStoredEmployees());
  }, []);

  useEffect(() => {
    saveEmployeesToStorage(employees);
  }, [employees]);

  const addEmployee = (newEmployee: Employee) => {
    setEmployees(prev => [...prev, newEmployee]);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  return context;
};