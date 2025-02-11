import React, { useState } from "react";
import type { TaskHistoryProps } from "../types/taksHistory";
import { useLanguage } from "~/features/LanguageTranslation/context/LanguageContext";
import translations from "../language/taskHistoryTableTranslation";
import Pagination from "~/common/utils/pagination";

const TaskHistory: React.FC<TaskHistoryProps> = ({ filteredTasks }) => {
  const { language } = useLanguage();
  const t = translations[language]; // Get translations for the current language

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Calculate paginated data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTasks = filteredTasks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="overflow-x-auto">
        {filteredTasks.length === 0 ? (
          <div className="text-muted-foreground text-center border border-border rounded-lg p-5">
            {t.noHistory}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="border px-4 py-2">{t.task}</th>
                  <th className="border px-4 py-2">{t.action}</th>
                  <th className="border px-4 py-2">{t.updatedField}</th>
                  <th className="border px-4 py-2">{t.oldValue}</th>
                  <th className="border px-4 py-2">{t.newValue}</th>
                  <th className="border px-4 py-2">{t.timestamp}</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTasks.map((history) => (
                  <tr
                    key={history.id}
                    className={`text-center even:bg-accent transition-colors duration-300`}
                  >
                    <td className="border px-4 py-2">{history.taskTitle}</td>
                    <td
                      className={`border px-4 py-2 font-bold ${
                        history.action === "CREATED"
                          ? "text-green-500"
                          : history.action === "UPDATED"
                          ? "text-blue-500"
                          : "text-red-500"
                      }`}
                    >
                      {history.action}
                    </td>
                    <td className="border px-4 py-2">
                      {history.updatedField || "-"}
                    </td>
                    <td className="border px-4 py-2">
                      {history.oldValue || "-"}
                    </td>
                    <td className="border px-4 py-2">
                      {history.newValue || "-"}
                    </td>
                    <td className="border px-4 py-2 text-sm">
                      {new Date(history.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Pagination
        totalItems={filteredTasks.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
      />
    </>
  );
};

export default TaskHistory;
