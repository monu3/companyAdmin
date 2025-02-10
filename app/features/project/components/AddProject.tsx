import React, { useContext, useState } from "react";
import { RiAddBoxFill } from "react-icons/ri";
import ProjectForm from "./ProjectForm";
import { ProjectContext, useProjectContext } from "../store/context";
import { Button } from "@/components/ui/button";
import { Grid, List, PlusCircle } from "lucide-react";
const AddProject = () => {
  const {
    isOpen,
    setIsOpen,
    view,
    setView,
    selectedProject,
    setSelectedProject,
  } = useProjectContext();

  const handleCreate = () => {
    setIsOpen(true);
    setSelectedProject(null);
  };
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-gray-500">Manage your pojects</p>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setView("table")}
          className={view === "table" ? "text-primary bg-orange-400" : ""}
        >
          <List />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setView("card")}
          className={view === "card" ? "text-primary bg-orange-400" : ""}
        >
          <Grid />
        </Button>

        <Button
          variant={"outline"}
          className="dark:text-text"
          onClick={handleCreate}
        >
          <PlusCircle />
        </Button>
        {isOpen && <ProjectForm selectedProject={selectedProject} />}
      </div>
    </div>
  );
};

export default AddProject;
