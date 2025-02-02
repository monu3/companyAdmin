import React, { useEffect, useMemo, useState } from "react";
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
import { CalendarIcon } from "lucide-react";
import {
  TaskStatus,
  type KanbanBoardProps,
  type Task,
} from "../../Types/types";
import { fetchTasks, updateTaskStatus } from "../../service/taskService";
import { getPriorityColor } from "../../../../common/utils/taskPriorityColor";
import { SortableTask } from "./SortableTask";
import { DroppableColumn } from "./DroppableColumn";

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskMove }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sourceColumn, setSourceColumn] = useState<string | null>(null);
  const [targetColumn, setTargetColumn] = useState<string | null>(null);
  const [localTasks, setLocalTasks] = useState<Task[]>([]);

  // Fetch tasks from backend on component mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks(); // Fetch tasks from backend
        setLocalTasks(tasks); // Store tasks in state
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };

    loadTasks();
  }, []);

  // Sensors for DndContext
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor) // Enables keyboard accessibility
  );

  // Columns logic: Filter tasks by status
  const columns = useMemo(() => {
    return Object.values(TaskStatus).map((status) => ({
      id: status, // Unique ID for the column (status value)
      title: status.replace("_", " ").toUpperCase(), // Column title
      tasks: localTasks.filter((task) => task.status === status), // Filter tasks by status
    }));
  }, [localTasks]);

  // Active task being dragged
  const activeTask = useMemo(
    () => localTasks.find((task) => task.id === activeId),
    [activeId, localTasks]
  );

  // Function to find the container of a dragged task
  const findContainer = (id: string) => {
    return columns.find((column) => column.tasks.some((task) => task.id === id))
      ?.id;
  };

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string); // Set the active task ID

    const task = localTasks.find((t) => t.id === active.id);
    const startColumn = task?.status; // Get the column where the task starts from
    setSourceColumn(startColumn || null); // Set source column ID
  };

  // Handle drag over event
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const overId = over.id as string;
    const overContainer = findContainer(overId);

    if (overContainer) {
      setTargetColumn(overContainer); // Set the target column ID
    }
  };

  // Handle drag end event
  const handleDragEnd = async (event: DragEndEvent) => {
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

    if (overContainer && Object.values(TaskStatus).includes(overContainer)) {
      setTargetColumn(overContainer); // Set the target column ID
    }

    if (targetColumn) {
      const updatedTasks = [...localTasks];
      const activeTask = updatedTasks.find((t) => t.id === activeTaskId);

      if (activeTask) {
        activeTask.status = targetColumn; // Update the task's status

        // Reorder tasks if dropped over another task
        const activeIndex = updatedTasks.indexOf(activeTask);
        const overTask = updatedTasks.find((task) => task.id === overId);
        if (overTask && activeTask !== overTask) {
          const overIndex = updatedTasks.indexOf(overTask);
          const newTasks = arrayMove(updatedTasks, activeIndex, overIndex);
          setLocalTasks(newTasks);
        } else {
          setLocalTasks(updatedTasks);
        }

        // Update task status on the backend
        try {
          await onTaskMove(activeTaskId, targetColumn);
        } catch (error) {
          console.error("Error updating task status on the backend:", error);
          // Revert the task status in the UI if the backend update fails
          activeTask.status = sourceColumn || activeTask.status;
          setLocalTasks([...updatedTasks]);
        }
      }
    }

    setActiveId(null);
    setSourceColumn(null);
    setTargetColumn(null);
  };

  // Handle drag cancel
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
