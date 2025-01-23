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

  // Validate description
  const validateDescription = () => {
    const description = taskData.content.trim();
    if (!description) return "Task description is required.";
    if (description.length < 3)
      return "Description must be at least 3 characters.";
    if (description.length > 50)
      return "Description must not exceed 50 characters.";
    return "";
  };

  // Validate due date
  const validateDate = () => {
    const selectedDate = new Date(taskData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return "Due date cannot be before today.";
    }
    return "";
  };

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
      id: Date.now().toString(),
      status: "To-Do",
      ...taskData,
    };
    onAddTask(newTask);
    setIsOpen(false);
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="content">Task Description</Label>
            <Input
              id="content"
              value={taskData.content}
              onChange={(e) =>
                setTaskData({ ...taskData, content: e.target.value })
              }
              className={descriptionError ? "border-red-500" : ""}
            />
            {descriptionError && (
              <p className="text-red-500 text-sm">{descriptionError}</p>
            )}
          </div>
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
              </SelectTrigger>
              <SelectContent>
                {priorityData.map((priority) => (
                  <SelectItem key={priority.id} value={priority.id}>
                    {priority.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
              </SelectTrigger>
              <SelectContent>
                {projectData.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              type="date"
              id="dueDate"
              value={taskData.dueDate}
              onChange={(e) =>
                setTaskData({ ...taskData, dueDate: e.target.value })
              }
              className={dateError ? "border-red-500" : ""}
            />
            {dateError && <p className="text-red-500 text-sm">{dateError}</p>}
          </div>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskForm;
