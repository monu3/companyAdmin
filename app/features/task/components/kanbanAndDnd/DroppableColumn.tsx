/**
 * DroppableColumn.tsx
 * Created On : 2025-31-01 14
 * Author : Diwash Pokhrel
 * Description : A reusable component for creating droppable columns in a Kanban board.
 * Utilizes the `@dnd-kit` library to enable drag-and-drop functionality and visually
 * indicates when the column is a drop target.
 */
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import type { DroppableColumnProps } from "../../Types/types";
export const DroppableColumn: React.FC<DroppableColumnProps> = ({
  id,
  title,
  children,
  isDropTarget,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div className="flex-none w-80">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <div
        ref={setNodeRef}
        className={`p-4 rounded-lg transition-colors ${
          isDropTarget
            ? "bg-gray-200 ring-2 ring-blue-500 ring-opacity-50"
            : "bg-gray-100"
        }`}
      >
        {/* Render Children (Tasks or Placeholder) */}
        {children}
      </div>
    </div>
  );
};
