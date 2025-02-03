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
    jobRole: string;
    email: string;
    department: string;
    salary: string;
    enrollDate: string;
  }

  export enum Department {
    HR = "HR",
    ENGINEERING = "ENGINEERING",
    MARKETING = "MARKETING",
    SALES = "SALES",
    FINANCE = "FINANCE",
    IT = "IT",
    LEGAL = "LEGAL",
    CUSTOMER_SUPPORT = "CUSTOMER_SUPPORT",
    PRODUCT = "PRODUCT",
    OPERATIONS = "OPERATIONS",
  }
  
  export enum JobRole {
    SUPERVISOR = "SUPERVISOR",
    KITCHEN = "KITCHEN",
    HELPER = "HELPER",
    TECHNICAL_SUPPORT = "TECHNICAL_SUPPORT",
    FULL_TIME = "FULL_TIME",
    PART_TIME = "PART_TIME",
    CONTRACTOR = "CONTRACTOR",
    INTERN = "INTERN",
    FREELANCER = "FREELANCER",
    MAINTENANCE = "MAINTENANCE",
  }