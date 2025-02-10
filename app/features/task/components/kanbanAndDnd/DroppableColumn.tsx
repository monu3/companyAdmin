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
        data-droppable="true" // Helps in collision detection
        className={`p-4 min-h-[100px] rounded-lg transition-colors flex flex-col space-y-2 ${
          isDropTarget || isOver
            ? "bg-[--color-card] ring-2 ring-blue-500 ring-opacity-50"
            : "bg-[--color-card]"
        }`}
      >
        {/* Ensure the column remains a valid drop zone even when empty */}
        {children && React.Children.count(children) > 0 ? (
          children
        ) : (
          <div className="text-center text-gray-500 py-4">Drag tasks here</div>
        )}
      </div>
    </div>
  );
};
