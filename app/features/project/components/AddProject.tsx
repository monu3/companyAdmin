import React, { useContext, useState } from "react";
import ProjectForm from "./ProjectForm";
import { ProjectContext, useProjectContext } from "../store/context";
import { Button } from "@/components/ui/button";
import { Grid, List, PlusCircle } from "lucide-react";
import { useLanguage } from "~/features/LanguageTranslation/context/LanguageContext";
import translations from "../language/AddProjects";
const AddProject = () => {
  const { language } = useLanguage();
  const t = translations[language];
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
        <h1 className="text-2xl font-bold">{t.projects}</h1>
        <p className="text-gray-500">{t.manageProjects}</p>
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
