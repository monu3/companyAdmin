import React from "react";
import { format } from "date-fns";
import type { ModalProps } from "../Types/types";
import { getPriorityColor } from "../../../common/utils/taskPriorityColor"; // Import the utility function
import { Button } from "~/components/ui/button";

const TaskDetailModal: React.FC<ModalProps> = ({ task, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Task Details</h3>
          <Button variant={"destructive"} onClick={onClose}>
            X
          </Button>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-lg text-gray-800">Title:</h4>
            <p className="text-gray-700">{task.content}</p>
          </div>

          {/* Priority */}
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-lg text-gray-800">Priority:</h4>
            <p
              className={`inline-block px-3 py-1 rounded-md ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority.toLowerCase()}
            </p>
          </div>

          {/* Project */}
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-lg text-gray-800">Project:</h4>
            <p className="text-gray-700">{task.project}</p>
          </div>

          {/* Due Date */}
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-lg text-gray-800">Due Date:</h4>
            <p className="text-gray-700">
              {format(new Date(task.dueDate), "MMM d, yyyy")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
