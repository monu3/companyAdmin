import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { projectData } from "../data/projectDumy";
import { statusData } from "../data/statusDumy";
import { priorityData } from "../data/ priorityDumy";
import { Button } from "@/components/ui/button";
import type { Task } from "../Types/types";

interface SearchFormProps {
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  allTasks: Task[];
}

export default function SearchForm({
  setFilteredTasks,
  allTasks,
}: SearchFormProps) {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");

  const handleReset = () => {
    setSelectedProject("");
    setSelectedStatus("");
    setSelectedPriority("");
    setFilteredTasks(allTasks);
  };

  const handleSearch = () => {
    const filtered = allTasks.filter((task) => {
      let isMatch = true;

      if (selectedProject && task.project !== selectedProject) {
        isMatch = false;
      }
      if (selectedStatus && task.status !== selectedStatus) {
        isMatch = false;
      }
      if (selectedPriority && task.priority !== selectedPriority) {
        isMatch = false;
      }

      return isMatch;
    });

    setFilteredTasks(filtered);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger>
            <SelectValue placeholder="Select Project" />
          </SelectTrigger>
          <SelectContent>
            {projectData.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            {statusData.map((status) => (
              <SelectItem key={status.id} value={status.id}>
                {status.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger>
            <SelectValue placeholder="Select Priority" />
          </SelectTrigger>
          <SelectContent>
            {priorityData.map((priority) => (
              <SelectItem key={priority.id} value={priority.id}>
                {priority.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex justify-end space-x-4 mb-6">
          <Button
            className="bg-teal-500 text-white hover:bg-teal-600"
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button
            variant="outline"
            className="text-red-500 hover:text-red-600"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
