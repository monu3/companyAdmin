/**
 * TaskDetailModal.tsx
 * Created On : 2025-24-01 12
 * Author : Diwash Pokhrel
 * Description : A modal component for displaying detailed information about a specific task.
 */

import React, { useState } from "react";
import { format } from "date-fns";
import type { ModalProps } from "../Types/types";
import { getPriorityColor } from "../../../common/utils/taskPriorityColor"; // Import the utility function
import { Button } from "~/components/ui/button";
import { deleteTask } from "../service/taskService";
import ToastService from "~/common/utils/toastService";

/**
 * TaskDetailModal Component
 * Displays detailed information about a task in a modal.
 * @param {ModalProps} props - The props object containing the task details and onClose function.
 */
const TaskDetailModal: React.FC<ModalProps> = ({ task, onClose }) => {
  const [isDeleting, setIsDeleting] = useState(false); // State to track the deletion process
  const [deleteError, setDeleteError] = useState<string | null>(null); // State to hold any error during deletion

  const handleDeleteTask = async () => {
    try {
      setIsDeleting(true); // Disable delete button while deleting
      await deleteTask(task.id); // Call deleteTask with the task ID
      ToastService.warning("Taks deleted successfully");
      onClose(); // Close the modal after deletion
    } catch (error) {
      setDeleteError("Failed to delete task. Please try again.");
    } finally {
      setIsDeleting(false); // Re-enable the button
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center p-4"
      onClick={onClose} // Close modal when clicking outside of it
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Task Details</h3>{" "}
          {/* Modal title */}
          <Button variant={"destructive"} onClick={onClose}>
            {" "}
            {/* Close button */}X
          </Button>
        </div>

        <div className="space-y-4">
          {/* Title Section */}
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-lg text-gray-800">Title:</h4>{" "}
            {/* Label for title */}
            <p className="text-gray-700">{task.title}</p>{" "}
            {/* Display task content */}
          </div>

          {/* Description Section */}
          <div className="break-words">
            <h4 className="font-medium text-lg text-gray-800">Description:</h4>{" "}
            {/* Label for title */}
            <p className="text-gray-700">{task.description}</p>{" "}
            {/* Display task content */}
          </div>

          {/* Priority Section */}
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-lg text-gray-800">Priority:</h4>{" "}
            {/* Label for priority */}
            <p
              className={`inline-block px-3 py-1 rounded-md ${getPriorityColor(
                task.priority // Get color based on priority level
              )}`}
            >
              {task.priority.toLowerCase()}{" "}
              {/* Display priority in lowercase */}
            </p>
          </div>

          {/* Project Section */}
          {/* <div className="flex items-center gap-2"> */}
          {/* <h4 className="font-medium text-lg text-gray-800">Project:</h4>{" "} */}
          {/* Label for project */}
          {/* <p className="text-gray-700">{task.project}</p>{" "} */}
          {/* Display project name */}
          {/* </div> */}

          {/* Due Date Section */}
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-lg text-gray-800">Due Date:</h4>{" "}
            {/* Label for due date */}
            <p className="text-gray-700">
              {format(new Date(task.dueDate), "MMM d, yyyy")}{" "}
              {/* Format and display due date */}
            </p>
          </div>
          {/* Delete Button */}
          <div className="mt-6 flex justify-end gap-2">
            <Button variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              onClick={handleDeleteTask}
              disabled={isDeleting} // Disable button while deleting
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
