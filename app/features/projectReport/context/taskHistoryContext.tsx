import React, { createContext, useContext, useEffect, useState } from "react";
import type { TaskHistory, TaskHistoryContextType } from "../types/taksHistory";
import { fetchTaskHistory } from "../service/fetchTaskHistoryService";
import { useAuth } from "~/features/loginAndLogoutAuth/context/authContext";

const TaskHistoryContext = createContext<TaskHistoryContextType | undefined>(
  undefined
);

export const TaskHistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [taskHistory, setTaskHistory] = useState<TaskHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const loadTaskHistory = async () => {
    try {
      setLoading(true);
      const data = await fetchTaskHistory(); // Now calling the service function
      setTaskHistory(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadTaskHistory();
    }
  }, []);

  return (
    <TaskHistoryContext.Provider
      value={{
        taskHistory,
        loading,
        error,
        refreshTaskHistory: loadTaskHistory,
      }}
    >
      {children}
    </TaskHistoryContext.Provider>
  );
};

// Custom hook for easy access
export const useTaskHistory = () => {
  const context = useContext(TaskHistoryContext);
  if (!context) {
    throw new Error("useTaskHistory must be used within a TaskHistoryProvider");
  }
  return context;
};
