import React, { useState } from "react";
import CreateTaskForm from "../components/CreateTaskForm";
import KanbanBoard from "../components/kanbanAndDnd/KanbanBoard";
import { Link, Outlet } from "react-router";
import { Button } from "~/components/ui/button";
import { useTaskContext } from "../context/TaskContext";
import type { Task } from "../Types/types";

const TaskPage: React.FC = () => {
  const { addTask, updateTask } = useTaskContext();
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleAddTask = async (task: Task) => {
    if (selectedTask) {
      await updateTask(task);
    } else {
      await addTask(task);
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
            <Button variant={"outline"}>Show Task List</Button>
          </Link>
          <Button
            variant={"outline"}
            onClick={() => setIsCreateTaskModalOpen(true)}
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
