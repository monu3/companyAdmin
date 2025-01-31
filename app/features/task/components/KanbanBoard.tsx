import React, { useMemo, useState } from "react";
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
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon, GripVertical } from "lucide-react";
import type { KanbanBoardProps, Task } from "../Types/types";
import { statusData } from "../data/statusDumy";
import { getPriorityColor } from "../../../common/utils/taskPriorityColor";
import { SortableTask } from "./SortableTask";
import { DroppableColumn } from "./DroppableColumn";

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskMove }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sourceColumn, setSourceColumn] = useState<string | null>(null);
  const [targetColumn, setTargetColumn] = useState<string | null>(null);
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);

  React.useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const columns = useMemo(() => {
    return statusData.map((status) => ({
      id: status.id,
      title: status.name,
      tasks: localTasks.filter((task) => task.status === status.name),
    }));
  }, [localTasks]);

  const activeTask = useMemo(
    () => localTasks.find((task) => task.id === activeId),
    [activeId, localTasks]
  );

  const findContainer = (id: string) => {
    if (statusData.some((status) => status.id === id)) {
      return id;
    }
    return columns.find((column) => column.tasks.some((task) => task.id === id))
      ?.id;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    const task = localTasks.find((t) => t.id === active.id);
    const startColumn = statusData.find((s) => s.name === task?.status);
    if (startColumn) {
      setSourceColumn(startColumn.id);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const overId = over.id as string;
    const overContainer = findContainer(overId);

    if (overContainer) {
      setTargetColumn(overContainer);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setSourceColumn(null);
      setTargetColumn(null);
      return;
    }

    const activeTaskId = active.id as string;
    const overId = over.id as string;

    const overContainer = findContainer(overId);

    // Find the destination column
    const destinationColumn = statusData.find(
      (status) => status.id === overId || status.id === overContainer
    );

    if (destinationColumn) {
      const updatedTasks = [...localTasks];
      const activeTask = updatedTasks.find((t) => t.id === activeTaskId);
      const overTask = updatedTasks.find((t) => t.id === overId);

      if (activeTask) {
        // Update the task's status
        activeTask.status = destinationColumn.name;

        if (overTask && activeTask !== overTask) {
          const activeIndex = updatedTasks.indexOf(activeTask);
          const overIndex = updatedTasks.indexOf(overTask);
          const newTasks = arrayMove(updatedTasks, activeIndex, overIndex);
          setLocalTasks(newTasks);
          onTaskMove(activeTaskId, destinationColumn.name);
        } else {
          setLocalTasks(updatedTasks);
          onTaskMove(activeTaskId, destinationColumn.name);
        }
      }
    }

    setActiveId(null);
    setSourceColumn(null);
    setTargetColumn(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setSourceColumn(null);
    setTargetColumn(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex overflow-x-auto space-x-6 p-4">
        {columns.map((column) => (
          <DroppableColumn
            key={column.id}
            id={column.id}
            title={column.title}
            isDropTarget={
              targetColumn === column.id && sourceColumn !== column.id
            }
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

      <DragOverlay
        dropAnimation={{
          duration: 300,
          easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
        }}
      >
        {activeTask ? (
          <Card className="shadow-xl rotate-3 bg-white w-72">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <GripVertical className="h-5 w-5 text-gray-500" />
                <Badge className={getPriorityColor(activeTask.priority)}>
                  {activeTask.priority}
                </Badge>
              </div>
              <h4 className="font-medium mb-2">{activeTask.content}</h4>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>
                  {format(new Date(activeTask.dueDate), "MMM d, yyyy")}
                </span>
              </div>
              <Badge className="mt-2 bg-blue-100 text-blue-800">
                {activeTask.project}
              </Badge>
            </CardContent>
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
