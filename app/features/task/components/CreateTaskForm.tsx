/**
 * CreateTaskForm.tsx
 * Created On : 2025-24-01 11
 * Author : Diwash Pokhrel
 * Description : This file contains the implementation of
 * the CreateTaskForm component, a reusable form designed
 * to create new tasks. It includes functionality for
 * validating task details, selecting projects and priorities,
 * and submitting the task to a parent component.
 */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { projectData } from "../data/projectDumy";
import { priorityData } from "../data/ priorityDumy";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { CreateTaskFormProps, Task } from "../Types/types";

/**
 * CreateTaskForm Component
 * @param {CreateTaskFormProps} props - The props object containing the onAddTask callback.
 */
const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    content: "",
    priority: "Low",
    project: "project1",
    dueDate: new Date().toISOString().split("T")[0],
  });

  const [descriptionError, setdescriptionError] = useState("");
  const [dateError, setDateError] = useState("");

  /**
   * Validate Task Description
   * Checks if the task description meets the required criteria.
   * @returns {string} - An error message if validation fails; otherwise an empty string.
   */
  const validateDescription = () => {
    const description = taskData.content.trim();
    if (!description) return "Task description is required."; // Check if empty
    if (description.length < 3)
      return "Description must be at least 3 characters."; // Minimum length check
    if (description.length > 50)
      return "Description must not exceed 50 characters."; // Maximum length check
    return ""; // No errors found
  };

  /**
   * Validate Due Date
   * Checks if the selected due date is valid (not in the past).
   * @returns {string} - An error message if validation fails; otherwise an empty string.
   */
  const validateDate = () => {
    const selectedDate = new Date(taskData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's date to midnight for comparison
    if (selectedDate < today) {
      return "Due date cannot be before today."; // Check if date is in the past
    }
    return ""; // No errors found
  };

  /**
   * Handle Form Submission
   * Validates input data and creates a new task if validation passes.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateDescription();
    const dateError = validateDate();

    if (validationError) {
      setdescriptionError(validationError);
      return;
    }

    if (dateError) {
      setDateError(dateError);
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(), // Generate a unique ID based on timestamp
      status: "To-Do", // Default status for new tasks
      ...taskData, // Spread operator to include other task data (content, priority, etc.)
    };
    onAddTask(newTask);
    setIsOpen(false);
    // Reset form data to defaults after submission
    setTaskData({
      content: "",
      priority: "Low",
      project: "project1",
      dueDate: new Date().toISOString().split("T")[0],
    });
    setDateError("");
    setdescriptionError("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Create Task</Button>
        {/* Button to open dialog */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle> {/* Dialog title */}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Description Input */}
          <div>
            <Label htmlFor="content">Task Description</Label>
            <Input
              id="content"
              value={taskData.content}
              onChange={
                (e) => setTaskData({ ...taskData, content: e.target.value }) // Update content state on change
              }
              className={descriptionError ? "border-red-500" : ""} // Highlight border if there's an error
            />
            {descriptionError && (
              <p className="text-red-500 text-sm">{descriptionError}</p> // Display error message if exists
            )}
          </div>
          {/* Priority Selection */}
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={taskData.priority}
              onValueChange={(value) =>
                setTaskData({ ...taskData, priority: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
                {/* Placeholder for select */}
              </SelectTrigger>
              <SelectContent>
                {priorityData.map((priority) => (
                  <SelectItem key={priority.id} value={priority.id}>
                    {priority.name} {/* Display each priority option */}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Project Selection */}
          <div>
            <Label htmlFor="project">Project</Label>
            <Select
              value={taskData.project}
              onValueChange={(value) =>
                setTaskData({ ...taskData, project: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
                {/* Placeholder for select */}
              </SelectTrigger>
              <SelectContent>
                {projectData.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name} {/* Display each project option */}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Due Date Input */}
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              type="date"
              id="dueDate"
              value={taskData.dueDate}
              onChange={
                (e) => setTaskData({ ...taskData, dueDate: e.target.value }) // Update due date state on change
              }
              className={dateError ? "border-red-500" : ""} // Highlight border if there's an error
            />
            {dateError && <p className="text-red-500 text-sm">{dateError}</p>}
            {/* Display error message if exists */}
          </div>
          {/* Submit Button */}
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Create Task {/* Button to submit the form */}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskForm;
