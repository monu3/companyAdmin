import React, { useState, useEffect } from "react";
import { useProjectContext } from "~/features/project/store/context";
import { CiCircleCheck } from "react-icons/ci";
import { MdOutlinePending } from "react-icons/md";
import { IoMdAlarm } from "react-icons/io";
import { MdOutlineHourglassTop } from "react-icons/md";
import { GiProgression } from "react-icons/gi";

const ProjectDetails = () => {
  const { project } = useProjectContext(); 
  const [countPending, setCountPending] = useState(0);
  const [countProgress, setCountProgress] = useState(0);
  const [countCompleted, setCountCompleted] = useState(0);
  const [countStarted, setCountStarted] = useState(0);
  const [countNotStarted, setCountNotStarted] = useState(0);

  // Count different project statuses
  useEffect(() => {
    let pending = 0,
      progress = 0,
      completed = 0,
      started = 0,
      notStarted = 0;

    project.forEach((project) => {
      if (project.status === "pending") pending++;
      if (project.status === "started") started++;
      if (project.status === "not-started") notStarted++;
      if (project.status === "in-progress") progress++;
      if (project.status === "completed") completed++;
    });

    setCountPending(pending);
    setCountProgress(progress);
    setCountCompleted(completed);
    setCountStarted(started);
    setCountNotStarted(notStarted);
  }, [project]); // Runs whenever `data` changes

  const projectDetail = [
    {
      icon: <CiCircleCheck />,
      label: "Total Projects",
      count: project.length || 0,
      bgColor: "bg-gradient-to-r from-blue-200 to-blue-300",
    },
    {
      icon: <MdOutlinePending />,
      label: "Pending",
      count: countPending,
      bgColor: "bg-gradient-to-r from-teal-200 to-teal-300",
    },
    {
      icon: <IoMdAlarm />,
      label: "Started",
      count: countStarted,
      bgColor: "bg-gradient-to-r from-red-200 to-red-300",
    },
    {
      icon: <MdOutlineHourglassTop />,
      label: "Not started",
      count: countNotStarted,
      bgColor: "bg-gradient-to-r from-orange-200 to-orange-300",
    },
    {
      icon: <GiProgression />,
      label: "In Progress",
      count: countProgress,
      bgColor: "bg-gradient-to-r from-purple-200 to-purple-300",
    },
    {
      icon: <CiCircleCheck />,
      label: "Completed",
      count: countCompleted,
      bgColor: "bg-gradient-to-r from-green-200 to-green-300",
    },
  ];

  return (
    <div className="py-2 rounded-lg">
      <h2 className="text-xl font-bold mb-3">Project Details</h2>
      <div className="grid grid-cols-6 gap-4">
        {projectDetail.map((detail, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 bg-gray-100 p-3 rounded-md ${detail.bgColor}`}
          >
            <div className="text-4xl">{detail.icon}</div>
            <div className="text-center">
              <p className="text-2xl font-bold">{detail.count}</p>
              <p className="font-medium">{detail.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
