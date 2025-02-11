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
import TaskDetailModal from "./TaskDetailModal"; // Import TaskDetailModal
import { getPriorityColor } from "../../../common/utils/taskPriorityColor";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useTaskContext } from "../context/TaskContext";
import { useLanguage } from "~/features/LanguageTranslation/context/LanguageContext";
import translations from "../language/ListTask";

const ListTasks: React.FC = () => {
  const { tasks, showModal, setShowModal } = useTaskContext();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // State to track the selected task

  const { language } = useLanguage();
  const t = translations[language];

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
        <h2 className="text-2xl font-bold mb-4">{t.taskListTitle}</h2>
        {/* Button to navigate to the tasks page */}
        <Link to="/tasks">
          <Button variant={"outline"} className="text-[--color-text]">
            {t.backButton}
          </Button>
        </Link>
      </div>

      {/* Grid layout for displaying task cards */}
      <div className="px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.length === 0 ? (
          <div className="col-span-full text-center text-lg text-gray-500">
            {t.noTasksFound}
          </div>
        ) : (
          tasks.map((task) => (
            <Card
              key={task.id} // Unique key for each card based on task ID
              className="mb-4 shadow-md cursor-pointer break-words" // Styling for card appearance
              onClick={() => handleTaskClick(task)} // Open modal on card click
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2 ">
                  {/* Display priority badge */}
                  <Badge className={`${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </Badge>
                </div>
                {/* Task content */}
                <h4 className="font-medium mb-2">Tasks: {task.title}</h4>
                <h4 className="font-medium mb-2">{task.description}</h4>
                {/* Due date display with calendar icon */}
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>
                    {format(new Date(task.dueDate), "MMM d, yyyy")}
                  </span>{" "}
                  {/* Format due date */}
                </div>
                {/* Project badge */}
                {/* <Badge className="bg-blue-100 text-blue-800">
                  {task.project}
                </Badge> */}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Modal for displaying selected task details */}
      {showModal && selectedTask && (
        <TaskDetailModal task={selectedTask} onClose={closeModal} />
      )}
    </div>
  );
};

export default ListTasks;
