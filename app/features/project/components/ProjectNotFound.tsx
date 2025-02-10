import React from "react";

const ProjectNotFound = () => {
  return (
    <div className="bg-orange-400 text-bg p-10 shadow-custom lg:rounded-lg sm:rounded-sm dark:bg-orange-400 dark:text-text text-center">
      <h2 className="text-2xl font-semibold">Project Not Found</h2>
      <p className="mt-2 text-sm">
        The project you are looking for does not exist or has been removed.
      </p>
    </div>
  );
};

export default ProjectNotFound;
