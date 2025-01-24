/**
 * SearchForm.tsx
 * Created On : 2025-24-01 12
 * Author : Diwash Pokhrel
 * Description : A reusable search form for filtering tasks based on project, status, and priority.
 */

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

// Props interface for the SearchForm component
interface SearchFormProps {
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>; // Function to update filtered tasks in parent
  allTasks: Task[]; // Array of all tasks to filter from
}

/**
 * SearchForm Component
 * A form that filters tasks based on project, status, and priority.
 */
export default function SearchForm({
  setFilteredTasks,
  allTasks,
}: SearchFormProps) {
  const [selectedProject, setSelectedProject] = useState<string>(""); // State for selected project filter
  const [selectedStatus, setSelectedStatus] = useState<string>(""); // State for selected status filter
  const [selectedPriority, setSelectedPriority] = useState<string>(""); // State for selected priority filter

  /**
   * Resets all filters and displays all tasks.
   */
  const handleReset = () => {
    setSelectedProject(""); // Clear project selection
    setSelectedStatus(""); // Clear status selection
    setSelectedPriority(""); // Clear priority selection
    setFilteredTasks(allTasks); // Reset filtered tasks to show all tasks
  };

  /**
   * Filters tasks based on selected criteria (project, status, priority).
   */
  const handleSearch = () => {
    const filtered = allTasks.filter((task) => {
      let isMatch = true;

      if (selectedProject && task.project !== selectedProject) {
        isMatch = false; // Check if task matches selected project
      }
      if (selectedStatus && task.status !== selectedStatus) {
        isMatch = false; // Check if task matches selected status
      }
      if (selectedPriority && task.priority !== selectedPriority) {
        isMatch = false; // Check if task matches selected priority
      }

      return isMatch; // Return true if all conditions match
    });

    setFilteredTasks(filtered); // Update filtered tasks in parent component
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Form layout using grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Project Filter Dropdown */}
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger>
            <SelectValue placeholder="Select Project" />
          </SelectTrigger>
          <SelectContent>
            {projectData.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name} {/* Display project name */}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter Dropdown */}
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            {statusData.map((status) => (
              <SelectItem key={status.id} value={status.id}>
                {status.name} {/* Display status name */}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Priority Filter Dropdown */}
        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger>
            <SelectValue placeholder="Select Priority" />
          </SelectTrigger>
          <SelectContent>
            {priorityData.map((priority) => (
              <SelectItem key={priority.id} value={priority.id}>
                {priority.name} {/* Display priority name */}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search and Reset Buttons */}
        <div className="flex justify-end space-x-4 mb-6">
          {/* Search Button */}
          <Button
            className="bg-teal-500 text-white hover:bg-teal-600"
            onClick={handleSearch}
          >
            Search {/* Trigger search functionality */}
          </Button>

          {/* Reset Button */}
          <Button
            variant="outline"
            className="text-red-500 hover:text-red-600"
            onClick={handleReset}
          >
            Reset {/* Reset filters to default state */}
          </Button>
        </div>
      </div>
    </div>
  );
}
