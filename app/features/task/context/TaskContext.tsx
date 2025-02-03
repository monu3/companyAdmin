//

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import type { Task } from "../Types/types";
import {
  fetchTasks,
  saveTask,
  deleteTask,
  updateTaskStatus,
} from "../service/taskService";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
  moveTask: (taskId: string, newStatus: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      const tasks = await fetchTasks();
      setTasks(tasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: Task) => {
    try {
      const newTask = await saveTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const updatedTask = await saveTask(task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const moveTask = async (taskId: string, newStatus: string) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === taskId ? { ...t, status: newStatus } : t
        )
      );
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, loading, addTask, updateTask, removeTask, moveTask }}
    >
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
