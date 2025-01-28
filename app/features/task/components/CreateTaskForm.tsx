import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { projectData } from "../data/projectDumy";
import { priorityData } from "../../task/data/ priorityDumy";
import type { CreateTaskFormProps, Task } from "../Types/types";
import { nanoid } from "nanoid";

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  onAddTask,
  selectedTask,
  setIsOpen,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<Task>({
    defaultValues: {
      content: "",
      priority: "Low",
      project: "project1",
      dueDate: new Date().toISOString().split("T")[0],
    },
  });

  // Pre-populate the form when selectedTask changes (edit mode)
  useEffect(() => {
    if (selectedTask) {
      reset(selectedTask); // Reset the form with the selectedTask data
    }
  }, [selectedTask, reset]);

  const onSubmit = (formData: Task) => {
    if (selectedTask) {
      // Update existing task
      const updatedTask = { ...formData, id: selectedTask.id };
      onAddTask(updatedTask); // Pass the updated task to the parent
    } else {
      // Create new task
      const newTask = { ...formData, id: nanoid(), status: "To-Do" };
      onAddTask(newTask); // Pass the new task to the parent
    }
    setIsOpen(false); // Close the modal
    reset(); // Reset the form
  };

  return (
    <div className="flex justify-center items-center min-h-screen fixed inset-0 bg-black bg-opacity-75 z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-3 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg overflow-y-scroll max-h-[515px] scrollbar-hidden"
      >
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-3">
          {/* Task Description */}
          <div className="form-control flex flex-col">
            <label>Task Description</label>
            <input
              type="text"
              {...register("content", {
                required: "Task description is required.",
                minLength: {
                  value: 3,
                  message: "Description must be at least 3 characters.",
                },
                maxLength: {
                  value: 50,
                  message: "Description must not exceed 50 characters.",
                },
              })}
              className={`{errors.content ? "border-red-500" : ""} rounded`}
            />
            {errors.content && (
              <p className="errorMsg text-error">{errors.content.message}</p>
            )}
          </div>

          {/* Priority Selection */}
          <div className="form-control flex flex-col">
            <label>Priority</label>
            <select
              {...register("priority", {
                required: "Priority is required.",
              })}
              className="h-10 border rounded"
            >
              {priorityData.map((priority) => (
                <option key={priority.id} value={priority.id}>
                  {priority.name}
                </option>
              ))}
            </select>
            {errors.priority && (
              <p className="errorMsg text-error">{errors.priority.message}</p>
            )}
          </div>

          {/* Project Selection */}
          <div className="form-control flex flex-col">
            <label>Project</label>
            <select
              {...register("project", {
                required: "Project is required.",
              })}
              className="h-10 border rounded"
            >
              {projectData.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            {errors.project && (
              <p className="errorMsg text-error">{errors.project.message}</p>
            )}
          </div>

          {/* Due Date */}
          <div className="form-control flex flex-col">
            <label>Due Date</label>
            <input
              type="date"
              {...register("dueDate", {
                required: "Due date is required.",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0); // Set today's date to midnight for comparison
                  return (
                    selectedDate >= today || "Due date cannot be before today."
                  );
                },
              })}
              // className={errors.dueDate ? "border-red-500" : ""}
              className={`${errors.dueDate ? "border-red-500" : ""} rounded`}
            />
            {errors.dueDate && (
              <p className="errorMsg text-error">{errors.dueDate.message}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-end mt-5">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {selectedTask ? "Save Changes" : "Create Task"}
          </Button>
          <Button
            type="button"
            className="bg-gray-500 hover:bg-gray-600"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskForm;
