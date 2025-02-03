import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "~/components/ui/button";
import { useTaskContext } from "../context/TaskContext";
import type { ModalProps } from "../Types/types";
import { getPriorityColor } from "~/common/utils/taskPriorityColor";
import ToastService from "~/common/utils/toastService";

const TaskDetailModal: React.FC<ModalProps> = ({ task, onClose }) => {
  const { removeTask, updateTask } = useTaskContext();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTask = async () => {
    setIsDeleting(true);
    try {
      await removeTask(task.id);
      ToastService.warning(`Task "${task.title}" has been removed.`);
      onClose(); // Close only if deletion is successful
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // Close only when clicking on backdrop
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Task Details</h3>
          <Button variant="destructive" onClick={onClose}>
            X
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-lg text-gray-800">Title:</h4>
            <p className="text-gray-700">{task.title}</p>
          </div>

          <div className="break-words">
            <h4 className="font-medium text-lg text-gray-800">Description:</h4>
            <p className="text-gray-700">{task.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <h4 className="font-medium text-lg text-gray-800">Priority:</h4>
            <p
              className={`inline-block px-3 py-1 rounded-md ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <h4 className="font-medium text-lg text-gray-800">Due Date:</h4>
            <p className="text-gray-700">
              {format(new Date(task.dueDate), "MMM d, yyyy")}
            </p>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button
              variant="destructive"
              onClick={handleDeleteTask}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Task"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
