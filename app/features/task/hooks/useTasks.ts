import { useEffect, useState, useRef } from "react";
import { fetchTasks } from "../service/taskService";
import type { Task } from "../Types/types";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
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

    if (!hasFetched.current) {
      loadTasks();
      hasFetched.current = true;
    }
  }, []); // { 2 }

  return { tasks, loading, setTasks }; // { 3 }
};
