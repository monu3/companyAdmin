/**
 * listTasks.tsx
 * Created On : 2025-24-01 12
 * Author : Diwash Pokhrel
 * Description : The ListTasks component is a React functional component
 * that displays a list of tasks in a grid layout using cards.
 * It fetches tasks from local storage and combines them with predefined dummy tasks.
 * Each task card shows its priority, content, due date, and project,
 * and clicking on a card opens a modal (TaskDetailModal) to display
 * detailed task information. The component also includes a button for
 * navigation and ensures responsive design for various screen sizes.
 */
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { Task } from "../Types/types";
import { dummyTasks } from "../data/dumyTask"; // Import dummy tasks
import TaskDetailModal from "./TaskDetailModal"; // Import TaskDetailModal
import { getPriorityColor } from "../../../common/utils/taskPriorityColor";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const ListTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks); // State to hold the list of tasks
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // State to track the selected task
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  /**
   * Effect hook to fetch tasks from local storage when the component mounts.
   * Combines dummy tasks with fetched tasks.
   */
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks"); // Retrieve tasks from local storage
    const fetchedTasks = storedTasks ? JSON.parse(storedTasks) : []; // Parse stored tasks or set to empty array if none found
    setTasks([...dummyTasks, ...fetchedTasks]); // Combine dummy and fetched tasks into state
  }, []);

  /**
   * Handles the click event on a task card.
   * Sets the selected task and opens the modal.
   * @param {Task} task - The clicked task object.
   */
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task); // Set the selected task state
    setShowModal(true); // Open the modal to display task details
  };

  /**
   * Closes the task detail modal.
   */
  const closeModal = () => {
    setShowModal(false); // Set modal visibility to false
  };

  return (
    <div className="h-auto p-2 md:px-4 dark:bg-[#121212]">
      {/* Header section with title and navigation button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Task List</h2>
        {/* Button to navigate to the tasks page */}
        <Link to="/tasks">
          <Button variant={"secondary"} className="dark:bg-orange-400">Go to Tasks</Button>
        </Link>
      </div>

      {/* Grid layout for displaying task cards */}
      <div className="px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <Card
            key={task.id} // Unique key for each card based on task ID
            className="mb-4 shadow-md cursor-pointer" // Styling for card appearance
            onClick={() => handleTaskClick(task)} // Open modal on card click
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                {/* Display priority badge */}
                <Badge className={`${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </Badge>
              </div>
              {/* Task content */}
              <h4 className="font-medium mb-2">{task.content}</h4>
              {/* Due date display with calendar icon */}
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>
                  {format(new Date(task.dueDate), "MMM d, yyyy")}
                </span>{" "}
                {/* Format due date */}
              </div>
              {/* Project badge */}
              <Badge className="bg-blue-100 text-blue-800">
                {task.project}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal for displaying selected task details */}
      {showModal && selectedTask && (
        <TaskDetailModal task={selectedTask} onClose={closeModal} />
      )}
    </div>
  );
};

export default ListTasks;
