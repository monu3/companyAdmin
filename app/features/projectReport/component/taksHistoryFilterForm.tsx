import React, { useState } from "react";
import type { TaskHistoryFilterFormProps } from "../types/taksHistory";

const TaskHistoryFilterForm: React.FC<TaskHistoryFilterFormProps> = ({
  onFilter,
  onReset,
}) => {
  const [filters, setFilters] = useState({ title: "", status: "" });

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
          placeholder="Search by title..."
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
          <option value="">All Status</option>
          <option value="CREATED">Created</option>
          <option value="UPDATED">Updated</option>
          <option value="DELETED">Deleted</option>
        </select>

        {/* 🔹 Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 brounded-md hover:bg-gray-500 transition"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2  rounded-md hover:bg-gray-500 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskHistoryFilterForm;
