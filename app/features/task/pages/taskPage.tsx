import React, { useState } from "react";
import CreateTaskForm from "../components/CreateTaskForm";
import KanbanBoard from "../components/kanbanAndDnd/KanbanBoard";
import { Link, Outlet } from "react-router";
import { Button } from "~/components/ui/button";
import type { Task } from "../Types/types";
import { useLanguage } from "~/features/LanguageTranslation/context/LanguageContext";
import translations from "../language/taskPage";

const TaskPage: React.FC = () => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleOpenEditModal = (task: Task) => {
    setSelectedTask(task);
    setIsCreateTaskModalOpen(true);
  };

  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <section className="h-auto p-4 md:px-6 dark:bg-[#121212]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{t.tasksTitle}</h2>
          <Link to="list">
            <Button className="text-[--color-text] " variant={"outline"}>
              {t.showTaskList}
            </Button>
          </Link>
          <Button
            className="text-[--color-text] "
            variant={"outline"}
            onClick={() => setIsCreateTaskModalOpen(true)}
          >
            {t.createTask}
          </Button>
        </div>

        {isCreateTaskModalOpen && (
          <CreateTaskForm
            onAddTask={() => setIsCreateTaskModalOpen(false)}
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
