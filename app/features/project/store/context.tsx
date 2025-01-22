import { createContext, useContext, useState, useEffect } from "react";
import type { ProjectContextType, projectDetails } from "../types";

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const ProjectContextProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultProjectDetails: projectDetails[] = [];
  const [data, setData] = useState<projectDetails[]>(defaultProjectDetails);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [view, setView] = useState<"table" | "card">("table");
  const [selectedProject, setSelectedProject] = useState<projectDetails | null>(null); // Track selected project
  const handleDelete = (selectedId: number) => {
    console.log("Data before delete:", data);
  
    const filteredData = data.filter(item => item.id !== selectedId);
    
    if (filteredData.length === data.length) {
      console.warn(`No item found with id: ${selectedId}`);
      return; // Exit if no item is deleted
    }
  
    setData(filteredData);
  
    console.log("Selected ID:", selectedId);
    console.log("Data after delete:", filteredData);
  };
  
  const handleEdit = (selectedId: number) => {
    // Find the project you want to edit based on the selectedId
    const projectToEdit = data.find(item => item.id === selectedId);
    
    // If project is found, set it as selectedProject and open the modal for editing
    if (projectToEdit) {
      setSelectedProject(projectToEdit);
      setIsOpen(true);  // Open the form for editing
    }
  };
  

  useEffect(() => {
    if (typeof window !== "undefined" && data.length > 0) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

useEffect(() => {
  if (typeof window !== "undefined") {
    // Ensure localStorage is accessed only in the browser
    const storedData = localStorage.getItem("data");
    if (storedData) {
      try {
        setData(JSON.parse(storedData));
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
      }
    }
  }
}, []);


  return (
    <ProjectContext.Provider value={{ data, setData, isOpen, setIsOpen, view, setView, selectedProject, handleDelete, handleEdit, setSelectedProject }}>
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
