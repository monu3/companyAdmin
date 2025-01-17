import React, { useState } from "react";
import { RiAddBoxFill } from "react-icons/ri";
import ProjectForm from "./ProjectForm";


const AddProject = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative flex justify-end ">
      {/* Icon Button to Open Form */}
      <button  className="bg-info text-2xl border-none m-2 rounded-lg px-2cursor-pointer hover:text-gray-500 transition-colors"
        onClick={() => setIsOpen(true)}>Create</button>

      {/* Popup Form */}
      {isOpen && (
        <ProjectForm />
      )}
    </div>
  );
};

export default AddProject;

