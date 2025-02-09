import React, { useState } from "react";
import type { TaskHistoryFilterFormProps } from "../types/taksHistory";
import { useLanguage } from "~/features/LanguageTranslation/context/LanguageContext";
import translations from "../language/filterFormTranslation";

const TaskHistoryFilterForm: React.FC<TaskHistoryFilterFormProps> = ({
  onFilter,
  onReset,
}) => {
  const [filters, setFilters] = useState({ title: "", status: "" });
  const { language } = useLanguage();
  const t = translations[language]; // Get translations for the current language

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-muted p-4 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        {/* 🔹 Task Title Input */}
        <input
          type="text"
          name="title"
          placeholder={t.searchTitle}
          value={filters.title}
          onChange={handleInputChange}
          className="w-full p-2 border border-border rounded-md"
        />

        {/* 🔹 Status Dropdown */}
        <select
          name="status"
          value={filters.status}
          onChange={handleInputChange}
          className="w-full md:w-1/3 p-2 border border-border rounded-md"
        >
          <option value="">{t.allStatus}</option>
          <option value="CREATED">{t.created}</option>
          <option value="UPDATED">{t.updated}</option>
          <option value="DELETED">{t.deleted}</option>
        </select>

        {/* 🔹 Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 brounded-md hover:bg-gray-500 transition"
          >
            {t.apply}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2  rounded-md hover:bg-gray-500 transition"
          >
            {t.reset}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskHistoryFilterForm;
