import { Department, JobRole } from "../service/enums";

export interface Employee {
  id?: number;
  name: string;
  email: string;
  position: string;
  department: Department;
  jobRole: JobRole;
  enrollDate: string;
  description?: string;
  company?: {
    email: string;
  };
}
