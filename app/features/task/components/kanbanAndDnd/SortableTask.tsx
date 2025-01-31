/**
 * SortableTask.tsx
 * Created On : 2025-31-01 14
 * Author : Diwash Pokhrel
 * Description : A reusable component for rendering a sortable task card in a Kanban board.
 * Utilizes the `@dnd-kit` library to enable drag-and-drop functionality and provides
 * visual feedback during dragging.
 */
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon, GripVertical } from "lucide-react";
import type { Task } from "../../Types/types";
import { getPriorityColor } from "../../../../common/utils/taskPriorityColor";

/**
 * Props for the SortableTask component.
 * @interface SortableTaskProps
 * @property {Task} task - The task object containing details like id, content, priority, dueDate, and project.
 */
interface SortableTaskProps {
  task: Task;
}

/**
 * SortableTask Component
 * A reusable component for rendering a sortable task card in a Kanban board.
 * Uses the `useSortable` hook from `@dnd-kit/sortable` to enable drag-and-drop functionality.
 * @param {SortableTaskProps} props - The props for the component.
 * @returns {React.ReactElement} A sortable task card with dynamic styling during dragging.
 */
export const SortableTask: React.FC<SortableTaskProps> = ({ task }) => {
  /**
   * useSortable Hook
   * Enables the task card to be draggable and sortable.
   * @property {object} attributes - Accessibility attributes for the draggable element.
   * @property {object} listeners - Event listeners for drag interactions.
   * @property {Function} setNodeRef - Assigns the draggable element to a DOM node.
   * @property {object} transform - The current transform values for the draggable element.
   * @property {string} transition - The transition style for smooth dragging.
   * @property {boolean} isDragging - Indicates if the task is currently being dragged.
   */
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  /**
   * Dynamic Styles for Dragging
   * Applies transform and transition styles during dragging.
   * Reduces opacity when the task is being dragged.
   */
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      {...attributes} // Accessibility attributes
      {...listeners} // Event listeners for drag interactions
      ref={setNodeRef} // Assigns the draggable element to this card
      style={style} // Applies dynamic styles for dragging
      className={`mb-4 ${isDragging ? "shadow-xl" : "shadow-sm"} cursor-grab`} // Adds shadow effect during dragging
    >
      <CardContent className="p-4">
        {/* Drag Handle and Priority Badge */}
        <div className="flex items-center justify-between mb-2">
          {/* Project Badge */}
          <Badge className="mt-2 bg-blue-100 text-blue-800">
            {task.project}
          </Badge>
          {/* Priority Badge */}
          <Badge className={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
        </div>

        {/* Task Content */}
        <h4 className="font-medium mb-2">{task.content}</h4>

        {/* Due Date */}
        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon className="h-4 w-4 mr-1" /> {/* Calendar icon */}
          <span>{format(new Date(task.dueDate), "MMM d, yyyy")}</span>{" "}
          {/* Formatted due date */}
        </div>
      </CardContent>
    </Card>
  );
};
