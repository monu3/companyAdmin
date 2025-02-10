import React from "react";
import DisplayCard from "./DisplayCard";
import DisplayTable from "./DisplayTable";
import { useProjectContext } from "../store/context";
import NoEmployee from "~/features/employee/components/NoEmployee";
import ProjectNotFound from "./ProjectNotFound";

const ProjectDisplay = () => {
  const { view, project } = useProjectContext(); // Add parentheses to call the hook properly

  return (
    <div>
      {project.length === 0 ? (
        <ProjectNotFound />
      ) : (
        <div>{view === "table" ? <DisplayTable /> : <DisplayCard />}</div>
      )}
    </div>
  );
};

export default ProjectDisplay;
