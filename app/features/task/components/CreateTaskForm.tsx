import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Priority,
  TaskStatus,
  type CreateTaskFormProps,
  type Task,
} from "../Types/types";
import { useTaskContext } from "../context/TaskContext";
import ToastService from "~/common/utils/toastService";

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  onAddTask,
  selectedTask,
  setIsOpen,
}) => {
  const { addTask, updateTask, tasks, setShowModal, setTasks } =
    useTaskContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: {
      title: "",
      description: "",
      status: TaskStatus.TO_DO,
      priority: Priority.LOW,
      dueDate: new Date().toISOString().split("T")[0], // Default to today's date
    },
  });

  // Pre-fill the form when editing a task
  useEffect(() => {
    if (selectedTask) {
      // console.log("Pre-filling form with:", selectedTask);
      reset(selectedTask); // Pre-fill form with selected task data
    }
  }, [selectedTask, reset]);

  const onSubmit = async (formData: Task) => {
    try {
      if (selectedTask) {
        // console.log("selected tasks: ", selectedTask);
        const updatedTask = { ...formData, id: selectedTask.id };
        // console.log("Updated Task being sent:", updatedTask);
        // await updateTask(updatedTask);
        const updatedTasks = await updateTask(updatedTask);
        // setTasks(updatedTasks);

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === selectedTask.id ? updatedTask : task
          )
        );
        setShowModal(false);
        ToastService.success("Task updated successfully");
      } else {
        const newTask = { ...formData };
        await addTask(newTask);
        ToastService.success("Task added successfully");
      }
      reset();
      setIsOpen(false);
    } catch (error) {
      // console.error("Failed to save task:", error);
      ToastService.error("Failed to save task. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen fixed inset-0 bg-black bg-opacity-75 z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-3 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg overflow-y-scroll max-h-[515px] scrollbar-hidden"
      >
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-3">
          {/* Task Title */}
          <div className="form-control flex flex-col">
            <label>Task Title</label>
            <input
              type="text"
              {...register("title", {
                required: "Task title is required.",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters.",
                },
                maxLength: {
                  value: 50,
                  message: "Title must not exceed 50 characters.",
                },
              })}
              className={`${errors.title ? "border-red-500" : ""} rounded`}
            />
            {errors.title && (
              <p className="errorMsg text-error">{errors.title.message}</p>
            )}
          </div>

          {/* Task Status */}
          <div className="form-control flex flex-col">
            <label>Status</label>
            <select
              {...register("status", {
                required: "Status is required.",
              })}
              className="h-10 border rounded"
            >
              {Object.values(TaskStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="errorMsg text-error">{errors.status.message}</p>
            )}
          </div>

          {/* Task Priority */}
          <div className="form-control flex flex-col">
            <label>Priority</label>
            <select
              {...register("priority", {
                required: "Priority is required.",
              })}
              className="h-10 border rounded"
            >
              {Object.values(Priority).map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            {errors.priority && (
              <p className="errorMsg text-error">{errors.priority.message}</p>
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
              className={`${errors.dueDate ? "border-red-500" : ""} rounded`}
            />
            {errors.dueDate && (
              <p className="errorMsg text-error">{errors.dueDate.message}</p>
            )}
          </div>
        </div>
        {/* Task Description */}
        <div className="form-control flex flex-col">
          <label>Task Description</label>
          <textarea
            {...register("description", {
              required: "Task description is required.",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters.",
              },
              maxLength: {
                value: 200,
                message: "Description must not exceed 200 characters.",
              },
            })}
            className={`${errors.description ? "border-red-500" : ""} rounded`}
          />
          {errors.description && (
            <p className="errorMsg text-error">{errors.description.message}</p>
          )}
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
