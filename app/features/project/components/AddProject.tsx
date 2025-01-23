import React, { useContext, useState } from "react";
import { RiAddBoxFill } from "react-icons/ri";
import ProjectForm from "./ProjectForm";
import { ProjectContext, useProjectContext } from "../store/context";
import { FaTable } from "react-icons/fa";
import { PiCardsFill } from "react-icons/pi";

const AddProject = () => {
  const {isOpen, setIsOpen, view, setView, selectedProject, setSelectedProject} = useProjectContext();

  const handleCreate = () => {
    setIsOpen(true);
    setSelectedProject(null);
  }
  return (
    <div className="relative flex justify-end items-center">
       {view === "card" && (
        <FaTable
          className="text-4xl cursor-pointer text-orange-500"
          onClick={() => setView("table")}
        />
      )}
      {view === "table" && (
        <PiCardsFill
          className="text-5xl cursor-pointer text-orange-400"
          onClick={() => setView("card")}
        />
      )}
      {/* Icon Button to Open Form */}
      <button  className="shadow-custom text-2xl border-none m-2 rounded-lg px-2cursor-pointer hover:text-gray-500 transition-colors"
        onClick={handleCreate}>Create</button>

      {/* Popup Form */}
      {isOpen && (
        <ProjectForm selectedProject={selectedProject}/>
      )}
    </div>
  );
};

export default AddProject;

