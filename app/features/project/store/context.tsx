import { createContext, useContext, useState } from "react";
import type { ProjectContextType, projectDetails } from "../types";

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const ProjectContextProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultProjectDetails: projectDetails[] = [];

  const [data, setData] = useState<projectDetails[]>(defaultProjectDetails);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ProjectContext.Provider value={{ data, setData, isOpen, setIsOpen }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};

export default ProjectContextProvider;
