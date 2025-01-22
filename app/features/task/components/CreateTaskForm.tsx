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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              required
            />
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
            />
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
