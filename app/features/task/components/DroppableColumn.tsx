import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableColumnProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isDropTarget: boolean;
}

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
        className={`p-4 rounded-lg transition-colors  ${
          isDropTarget
            ? "bg-gray-200 ring-2 ring-blue-500 ring-opacity-50"
            : "bg-gray-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
