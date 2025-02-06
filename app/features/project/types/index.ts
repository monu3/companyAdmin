export interface ProjectContextType {
  project: projectDetails[]; // Explicitly defining the type for `data`
  setProject: React.Dispatch<React.SetStateAction<projectDetails[]>>; // Updated to match the new `data` type
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  view: "table" | "card"; // Union type for the possible values of `view`
  setView: React.Dispatch<React.SetStateAction<"table" | "card">>;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
  selectedProject: projectDetails | null;
  setSelectedProject: React.Dispatch<
    React.SetStateAction<projectDetails | null>
  >;
}

export interface projectDetails {
  id: number;
  progress: number;
  title: string;
  category: string;
  price: number;
  startDate: Date;
  endDate: Date;
  clientId: string;
  status: string;
  description: string;
}
