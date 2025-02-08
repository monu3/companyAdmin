import React, { useState, useEffect } from "react";
import { useTaskHistory } from "../context/taskHistoryContext";
import TaskHistoryTimeFilter from "../component/taskHistoryTimeFilter";
import TaskHistory from "../component/taskHistoryComponent";
import TaskHistoryFilterForm from "../component/taksHistoryFilterForm";

const TaskHistoryPage: React.FC = () => {
  const { taskHistory, loading, error } = useTaskHistory();
  const [filteredTasks, setFilteredTasks] = useState(taskHistory);

  useEffect(() => {
    setFilteredTasks(taskHistory);
  }, [taskHistory]);

  const handleTimeFilterChange = (filter: string) => {
    const now = new Date();
    let filtered = [];

    switch (filter) {
      case "today":
        filtered = taskHistory.filter(
          (task) =>
            new Date(task.timestamp).toDateString() === now.toDateString()
        );
        break;
      case "yesterday":
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        filtered = taskHistory.filter(
          (task) =>
            new Date(task.timestamp).toDateString() === yesterday.toDateString()
        );
        break;
      case "week":
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 7);
        filtered = taskHistory.filter(
          (task) => new Date(task.timestamp) >= lastWeek
        );
        break;
      case "month":
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        filtered = taskHistory.filter(
          (task) => new Date(task.timestamp) >= lastMonth
        );
        break;
      default:
        filtered = taskHistory;
    }

    setFilteredTasks(filtered);
  };

  // 🔹 Title & Status Filtering
  const handleFilter = (filters: { title: string; status: string }) => {
    let filtered = taskHistory;

    if (filters.title) {
      filtered = filtered.filter((task) =>
        task.taskTitle.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter((task) => task.action === filters.status);
    }

    setFilteredTasks(filtered);
  };

  // 🔹 Reset Filters
  const handleReset = () => {
    setFilteredTasks(taskHistory);
  };

  if (loading)
    return <div className="text-center py-5 text-blue-500">Loading...</div>;
  if (error)
    return <div className="text-center py-5 text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-card text-card-foreground shadow-lg rounded-lg transition-colors duration-300">
      <h2 className="text-2xl font-semibold text-center mb-4">Task History</h2>

      <TaskHistoryTimeFilter onFilterChange={handleTimeFilterChange} />
      <TaskHistoryFilterForm onFilter={handleFilter} onReset={handleReset} />
      <TaskHistory filteredTasks={filteredTasks} />
    </div>
  );
};

export default TaskHistoryPage;
