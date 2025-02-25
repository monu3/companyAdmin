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
import { getPriorityColor } from "~/common/utils/taskPriorityColor";
import ToastService from "~/common/utils/toastService";
import { useLanguage } from "~/features/LanguageTranslation/context/LanguageContext";
import translations from "../../language/DragTask";

const KanbanBoard: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const { tasks, moveTask, setTasks } = useTaskContext();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  // Memoized columns structure with original formatting
  const columns = useMemo(
    () =>
      Object.values(TaskStatus).map((status) => ({
        id: status,
        title: status,
        tasks: tasks.filter((task) => task.status === status),
      })),
    [tasks]
  );

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
    if (over) setActiveColumnId(findContainer(over.id as string));
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
      try {
        await moveTask(activeTaskId, newStatus);
        // Directly update the task state to reflect the change in the UI
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === activeTaskId ? { ...task, status: newStatus } : task
          )
        );
        ToastService.success("Task moved", 500);
      } catch (error) {
        console.error("Task movement failed:", error);
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
            // title={column.title}
            title={t[column.title]}
            isDropTarget={column.id === activeColumnId}
          >
            <SortableContext
              items={column.tasks.map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {column.tasks.length === 0 ? (
                  <div className="flex items-center justify-center text-sm text-gray-500 h-24">
                    {t.drag}
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
          <Card className="shadow-xl rotate-3 bg-[--new] text-[--new-text] w-72 break-words">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge className={getPriorityColor(activeTask.priority)}>
                  {activeTask.priority}
                </Badge>
              </div>
              <h4 className="font-medium mb-2 ">{activeTask.title}</h4>
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
