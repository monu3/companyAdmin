import React, { useState } from "react";
import { useTaskHistory } from "../context/taskHistoryContext";
import { RotateCcw } from "lucide-react";
import type { TaskHistoryTimeFilterProps } from "../types/taksHistory";
import { useLanguage } from "~/features/LanguageTranslation/context/LanguageContext";
import translations from "../language/TaskHistoryFilterByTIme";

const TaskHistoryTimeFilter: React.FC<TaskHistoryTimeFilterProps> = ({
  onFilterChange,
}) => {
  const { language } = useLanguage();
  const t = translations[language]; // Get translations for the current language
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const { refreshTaskHistory } = useTaskHistory();

  const filters = [
    { label: t.today, value: "today" },
    { label: t.yesterday, value: "yesterday" },
    { label: t.week, value: "week" },
    { label: t.month, value: "month" },
    { label: t.older, value: "older" },
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
        {t.reload}
      </button>
    </div>
  );
};

export default TaskHistoryTimeFilter;
