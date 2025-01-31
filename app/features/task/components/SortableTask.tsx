import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon, GripVertical } from "lucide-react";
import type { Task } from "../Types/types";
import { getPriorityColor } from "../../../common/utils/taskPriorityColor";

interface SortableTaskProps {
  task: Task;
}

export const SortableTask: React.FC<SortableTaskProps> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`mb-4 ${isDragging ? "shadow-xl" : "shadow-sm"}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div {...attributes} {...listeners} className="cursor-grab">
            <GripVertical className="h-5 w-5 text-gray-500" />
          </div>
          <Badge className={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
        </div>
        <h4 className="font-medium mb-2">{task.content}</h4>
        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>{format(new Date(task.dueDate), "MMM d, yyyy")}</span>
        </div>
        <Badge className="mt-2 bg-blue-100 text-blue-800">{task.project}</Badge>
      </CardContent>
    </Card>
  );
};
