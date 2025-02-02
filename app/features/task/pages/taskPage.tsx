/**
 * taskPage.tsx
 * Created On: 2025-24-01 12
 * Author: Diwash Pokhrel
 * Description: This component serves as the main page for managing tasks,
 * featuring a Kanban board, task creation form, and search functionality.
 */
import React, { useState } from "react";
import CreateTaskForm from "../components/CreateTaskForm";
import KanbanBoard from "../components/kanbanAndDnd/KanbanBoard";
import { Link, Outlet } from "react-router";
import { Button } from "~/components/ui/button";
import { useTaskContext } from "../context/TaskContext";
import type { Task } from "../Types/types";

const TaskPage: React.FC = () => {
  const { tasks, setTasks } = useTaskContext();
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleAddTask = (task: Task) => {
    if (selectedTask) {
      // Update existing task
      const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
      setTasks(updatedTasks);
    } else {
      // Add new task
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
    }
    setSelectedTask(null);
    setIsCreateTaskModalOpen(false);
  };

  return (
    <>
      <section className="h-auto p-4 md:px-6 dark:bg-[#121212]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <Link to="list">
            <Button
              variant={"outline"}
              className="text-gray-800 dark:bg-orange-400 dark:text-white dark:hover:bg-orange-300 hover:bg-gray-200 transition-colors"
            >
              Show Task List
            </Button>
          </Link>

          <Button
            variant={"outline"}
            onClick={() => {
              setSelectedTask(null);
              setIsCreateTaskModalOpen(true);
            }}
            className="text-gray-800 dark:text-white dark:bg-orange-400 dark:hover:bg-orange-300 hover:bg-gray-200 transition-colors"
          >
            Create Task
          </Button>
        </div>

        {isCreateTaskModalOpen && (
          <CreateTaskForm
            onAddTask={handleAddTask}
            selectedTask={selectedTask}
            setIsOpen={setIsCreateTaskModalOpen}
          />
        )}

        <KanbanBoard />
        <Outlet />
      </section>
    </>
  );
};

export default TaskPage;
