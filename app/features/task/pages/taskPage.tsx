import React, { useState, useEffect } from "react";
import CreateTaskForm from "../components/CreateTaskForm";
import KanbanBoard from "../components/KanbanBoard";
import { dummyTasks } from "../data/dumyTask";
import SearchForm from "../components/searchForm";
import type { Task } from "../Types/types";
import { Link, Outlet } from "react-router";
import { ImageOff } from "lucide-react";
import { Button } from "~/components/ui/button";

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
      setFilteredTasks([...dummyTasks, ...parsedTasks]);
    } else {
      setFilteredTasks(dummyTasks);
    }
  }, []);

  const handleAddTask = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setFilteredTasks([...dummyTasks, ...updatedTasks]);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleTaskMove = (taskId: string, newStatus: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks([...dummyTasks, ...updatedTasks]);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Persist to localStorage
  };

  const allTasks = [...dummyTasks, ...tasks];

  return (
    <>
      <section className="h-auto px-4 md:px-6 dark:bg-[#494242]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <Link to="list">
            {/* Added the link to the ListTasks page */}
            <Button variant={"link"}>Show Task List</Button>
          </Link>

          <CreateTaskForm onAddTask={handleAddTask} />
        </div>
        <SearchForm setFilteredTasks={setFilteredTasks} allTasks={allTasks} />
        <KanbanBoard tasks={filteredTasks} onTaskMove={handleTaskMove} />
        <Outlet />
      </section>
    </>
  );
};

export default TaskPage;
