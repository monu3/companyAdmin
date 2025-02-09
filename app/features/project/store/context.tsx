import { createContext, useContext, useState, useEffect } from "react";
import type { ProjectContextType, projectDetails } from "../types";
import ToastService from "~/common/utils/toastService";
import { fetchProjectDetail } from "../service/fetchProject";
import { deleteProject } from "../service/deleteProjects";

export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

const ProjectContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const defaultProjectDetails: projectDetails[] = [];
  const [project, setProject] = useState<projectDetails[]>(
    defaultProjectDetails
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [view, setView] = useState<"table" | "card">("table");
  const [selectedProject, setSelectedProject] = useState<projectDetails | null>(
    null
  ); // Track selected project

  const handleDelete = async (selectedId: number) => {
    // console.log("data before delete:", project);
    await deleteProject(selectedId.toString());

    //removed the deleted project from the state
    const filteredData = project.filter((item) => item.id !== selectedId);

    if (filteredData.length === project.length) {
      console.warn(`No item found with id: ${selectedId}`);
      return; // Exit if no item is deleted
    }

    setProject(filteredData);
    ToastService.success("Project deleted successfully", 500);
    // console.log("Selected ID:", selectedId);
    // console.log("Data after delete:", filteredData);
  };

  const handleEdit = (selectedId: number) => {
    // Find the project you want to edit based on the selectedId
    const projectToEdit = project.find((item) => item.id === selectedId);

    // If project is found, set it as selectedProject and open the modal for editing
    if (projectToEdit) {
      setSelectedProject(projectToEdit);
      setIsOpen(true); // Open the form for editing
    }
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined" && project.length > 0) {
  //     localStorage.setItem("data", JSON.stringify(project));
  //   }
  // }, [project]);

  const fetchProject = async () => {
    try {
      const storedData = await fetchProjectDetail();
      setProject(storedData);
      // if (storedData) {
      //   setProject(storedData);
      // }
    } catch (error) {
      console.error("Failed to fetch project:", error);
    }
  };
  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        isOpen,
        setIsOpen,
        view,
        setView,
        selectedProject,
        handleDelete,
        handleEdit,
        setSelectedProject,
        refreshProject: fetchProject,
      }}
    >
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
