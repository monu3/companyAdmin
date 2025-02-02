export interface EmployeeContextProps {
  employees: Employee[];
  setEmployees:React.Dispatch<React.SetStateAction<Employee[]>>;
  updateEmployee: (id: string) => void;
  deleteEmployee: (id: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  view: "table" | "card"; // Union type for the possible values of `view`
  setView: React.Dispatch<React.SetStateAction<"table" | "card">>;
  selectedEmployee:Employee|null;
  setSelectedEmployee:React.Dispatch<React.SetStateAction<Employee|null>>;
}

export interface Employee {
    id: string;
    name: string;
    position: string;
    email: string;
    department: string;
    salary: string;
    joinDate: string;
  }