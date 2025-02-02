import React, { useState, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  rectIntersection,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { TaskStatus, type Task } from "../../Types/types";
import { SortableTask } from "./SortableTask";
import { DroppableColumn } from "./DroppableColumn";
import { useTaskContext } from "../../context/TaskContext";
import { updateTaskStatus } from "../../service/taskService";
import { getPriorityColor } from "~/common/utils/taskPriorityColor";

const KanbanBoard: React.FC = () => {
  const { tasks, setTasks } = useTaskContext();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const columns = useMemo(() => {
    return Object.values(TaskStatus).map((status) => ({
      id: status,
      title: status.replace("_", " ").toUpperCase(),
      tasks: tasks.filter((task) => task.status === status),
    }));
  }, [tasks]);

  const activeTask = useMemo(
    () => tasks.find((task) => task.id === activeId),
    [activeId, tasks]
  );

  const findContainer = (id: string): string | null => {
    const container =
      columns.find((column) => column.id === id) ||
      columns.find((column) => column.tasks.some((task) => task.id === id));

    return container?.id || null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (over) {
      setActiveColumnId(findContainer(over.id as string));
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTaskId = active.id as string;
    const newStatus = findContainer(over.id as string);

    if (
      newStatus &&
      Object.values(TaskStatus).includes(newStatus as TaskStatus)
    ) {
      const updatedTasks = tasks.map((task) =>
        task.id === activeTaskId
          ? { ...task, status: newStatus as TaskStatus }
          : task
      );

      setTasks(updatedTasks);

      try {
        await updateTaskStatus(activeTaskId, newStatus);
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }

    setActiveId(null);
    setActiveColumnId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex overflow-x-auto space-x-6 p-4">
        {columns.map((column) => (
          <DroppableColumn
            key={column.id}
            id={column.id}
            title={column.title}
            isDropTarget={column.id === activeColumnId}
          >
            <SortableContext
              items={column.tasks.map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {column.tasks.length === 0 ? (
                  <div className="flex items-center justify-center text-sm text-gray-500 h-24">
                    Drag tasks here
                  </div>
                ) : (
                  column.tasks.map((task) => (
                    <SortableTask key={task.id} task={task} />
                  ))
                )}
              </div>
            </SortableContext>
          </DroppableColumn>
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <Card className="shadow-xl rotate-3 bg-white w-72 break-words">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge className={getPriorityColor(activeTask.priority)}>
                  {activeTask.priority}
                </Badge>
              </div>
              <h4 className="font-medium mb-2">{activeTask.title}</h4>
              <h4 className="font-medium mb-2">{activeTask.description}</h4>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>
                  {format(new Date(activeTask.dueDate), "MMM d, yyyy")}
                </span>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
