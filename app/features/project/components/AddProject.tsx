import React, { useContext, useState } from "react";
import { RiAddBoxFill } from "react-icons/ri";
import ProjectForm from "./ProjectForm";
import { ProjectContext, useProjectContext } from "../store/context";
import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';
const AddProject = () => {
  const {isOpen, setIsOpen, view, setView, selectedProject, setSelectedProject} = useProjectContext();

  const handleCreate = () => {
    setIsOpen(true);
    setSelectedProject(null);
  }
  return (
    <div className="relative flex justify-end items-center">
      
       {view === "card" && (
        <Button
        variant="outline"
        size="icon"
        onClick={() => setView('table')}
        className="text-gray-800 dark:text-white dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors"
      >
        <Grid />
      </Button>
      )}
      {view === "table" && (
        <Button
        variant="outline"
        size="icon"
        onClick={() => setView('card')}
        className="text-gray-800 dark:text-white dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors"
      >
        <List/>
      </Button>
      )}
      {/* Icon Button to Open Form */}
      <button  className="shadow-custom text-2xl border-none m-2 rounded-lg px-2cursor-pointer dark:bg-orange-400 hover:text-gray-500 transition-colors"
        onClick={handleCreate}>Create</button>

      {/* Popup Form */}
      {isOpen && (
        <ProjectForm selectedProject={selectedProject}/>
      )}
    </div>
  );
};

export default AddProject;

