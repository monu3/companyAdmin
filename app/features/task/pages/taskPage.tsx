/**
 * taskPage.tsx
 * Created On: 2025-24-01 12
 * Author: Diwash Pokhrel
 * Description: This component serves as the main page for managing tasks,
 * featuring a Kanban board, task creation form, and search functionality.
 */
import React, { useState, useEffect } from "react";
import CreateTaskForm from "../components/CreateTaskForm";
import KanbanBoard from "../components/kanbanAndDnd/KanbanBoard";
import SearchForm from "../components/searchForm";
import type { Task } from "../Types/types";
import { Link, Outlet } from "react-router";
import { Button } from "~/components/ui/button";
import { fetchTasks, updateTaskStatus } from "../service/taskService";

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        // Fetch tasks from the backend
        const tasksFromBackend = await fetchTasks();
        setTasks(tasksFromBackend); // Set the fetched tasks to state
        setFilteredTasks(tasksFromBackend); // Initialize filtered tasks with all tasks
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
    loadTasks(); // Call the function to load tasks
  }, []);

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
    setSelectedTask(null); // Reset selected task
    setIsCreateTaskModalOpen(false); // Close the modal
  };


  const handleTaskMove = async (taskId: string, newStatus: string) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks); // Update filtered tasks as well
    } catch (error) {
      console.error("Error updating task status:", error);
      throw error; // Rethrow the error to handle it in the KanbanBoard component
    }
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered); // Update filtered tasks based on search
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsCreateTaskModalOpen(true);
  };

  return (
    <>
      <section className="h-auto p-4 md:px-6 dark:bg-[#121212]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <Link to="list">
            {/* Added the link to the ListTasks page */}
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
              setSelectedTask(null); // Ensure no task is selected when creating a new one
              setIsCreateTaskModalOpen(true);
            }}
            className="text-gray-800 dark:text-white dark:bg-orange-400 dark:hover:bg-orange-300 hover:bg-gray-200 transition-colors"
          >
            Create Task
          </Button>
        </div>

        {/* Create Task Form Modal */}
        {isCreateTaskModalOpen && (
          <CreateTaskForm
            onAddTask={handleAddTask}
            selectedTask={selectedTask}
            setIsOpen={setIsCreateTaskModalOpen}
          />
        )}

        {/* Search Form */}
        {/* <SearchForm onSearch={handleSearch} /> */}
        {/* Kanban Board */}
        <KanbanBoard tasks={filteredTasks} onTaskMove={handleTaskMove} />
        <Outlet />
      </section>
    </>
  );
};

export default TaskPage;
