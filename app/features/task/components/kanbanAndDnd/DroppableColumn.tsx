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

/**
 * Props for the DroppableColumn component.
 * @interface DroppableColumnProps
 * @property {string} id - A unique identifier for the droppable column.
 * @property {string} title - The title of the column (e.g., "To Do", "In Progress").
 * @property {React.ReactNode} children - The content (tasks) to be rendered inside the column.
 * @property {boolean} isDropTarget - Indicates whether the column is currently a drop target.
 */
interface DroppableColumnProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isDropTarget: boolean;
}

/**
 * DroppableColumn Component
 * A reusable component for creating droppable columns in a Kanban board.
 * Uses the `useDroppable` hook from `@dnd-kit/core` to enable drag-and-drop functionality.
 * @param {DroppableColumnProps} props - The props for the component.
 * @returns {React.ReactElement} A droppable column with dynamic styling based on its state.
 */
export const DroppableColumn: React.FC<DroppableColumnProps> = ({
  id,
  title,
  children,
  isDropTarget,
}) => {
  /**
   * useDroppable Hook
   * Enables the column to be a droppable area for draggable items.
   * @property {Function} setNodeRef - Assigns the droppable area to a DOM element.
   * @property {boolean} isOver - Indicates if a draggable item is currently over the column.
   */
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div className="flex-none w-80">
      {/* Column Title */}
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>

      {/* Droppable Area */}
      <div
        ref={setNodeRef} // Assigns the droppable area to this container
        className={`p-4 rounded-lg transition-colors ${
          isDropTarget
            ? "bg-gray-200 ring-2 ring-blue-500 ring-opacity-50" // Drop target style
            : "bg-gray-100" // Default style
        }`}
      >
        {/* Render Children (Tasks or Placeholder) */}
        {children}
      </div>
    </div>
  );
};
