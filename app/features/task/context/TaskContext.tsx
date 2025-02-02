// context/TaskContext.tsx
import React, { createContext, useContext, type ReactNode } from "react";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../Types/types";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  setTasks: (tasks: Task[]) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { tasks, loading, setTasks } = useTasks();

  return (
    <TaskContext.Provider value={{ tasks, loading, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
