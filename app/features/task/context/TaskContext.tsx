//

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import type { Task, TaskContextType } from "../Types/types";
import {
  fetchTasks,
  saveTask,
  deleteTask,
  updateTaskStatus,
} from "../service/taskService";
import { useTaskHistory } from "~/features/projectReport/context/taskHistoryContext";
import { isAuthenticated } from "~/features/auth/auth";
import { useAuth } from "~/features/loginAndLogoutAuth/context/authContext";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { refreshTaskHistory } = useTaskHistory();
  const { isAuthenticated } = useAuth();
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
      refreshTaskHistory();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      // console.log("task coming for updating in taskCOntext:", task);
      const updatedTask = await saveTask(task);
      // console.log("task after updating in taskCOntext:", updateTask);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
      refreshTaskHistory();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
      refreshTaskHistory();
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
      refreshTaskHistory();
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadTasks();
    }
  }, [isAuthenticated]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        loading,
        addTask,
        updateTask,
        removeTask,
        moveTask,
        showModal,
        setShowModal,
        refreshTasks: loadTasks,
      }}
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
