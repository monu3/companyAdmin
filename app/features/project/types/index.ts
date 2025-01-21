export interface ProjectContextType {
  data: projectDetails[];  // Explicitly defining the type for `data`
  setData: React.Dispatch<React.SetStateAction<projectDetails[]>>;  // Updated to match the new `data` type
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export interface projectDetails{
  length: number;
  title: string,
  category: string,
  price: number,
  startDate: Date,
  endDate: Date,
  lead: string,
  client: string,
  employee: number,
  status: string,
  description: string
}