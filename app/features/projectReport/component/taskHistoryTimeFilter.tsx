import React, { useState } from "react";
import { useTaskHistory } from "../context/taskHistoryContext";
import { RotateCcw } from "lucide-react";
import type { TaskHistoryTimeFilterProps } from "../types/taksHistory";

const TaskHistoryTimeFilter: React.FC<TaskHistoryTimeFilterProps> = ({
  onFilterChange,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const { refreshTaskHistory } = useTaskHistory();

  const filters = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 Days", value: "week" },
    { label: "Last 30 Days", value: "month" },
    { label: "Older", value: "older" },
  ];

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 p-4 bg-muted shadow-md rounded-lg mb-6 transition-colors duration-300">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleFilterClick(filter.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300
            ${
              selectedFilter === filter.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
        >
          {filter.label}
        </button>
      ))}
      {/* 🔄 Reload Button */}
      <button
        type="button"
        onClick={refreshTaskHistory}
        className="px-4 py-2 flex items-center gap-1 bg-green-500 dark:bg-green-600 text-white rounded-md hover:bg-green-600 dark:hover:bg-green-500 transition"
      >
        <RotateCcw size={16} />
        Reload
      </button>
    </div>
  );
};

export default TaskHistoryTimeFilter;
