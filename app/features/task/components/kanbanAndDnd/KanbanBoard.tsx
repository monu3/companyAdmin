/**
 * KanbanBoard.tsx
 * Created On : 2025-31-01 14
 * Author : Diwash Pokhrel
 * Description : A dynamic Kanban board component that enables drag-and-drop functionality
 * for managing tasks across different columns (e.g., To Do, In Progress, Done).
 * Utilizes the `@dnd-kit` library for smooth drag-and-drop interactions and provides
 * visual feedback during task movement.
 */
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
import type { KanbanBoardProps, Task } from "../../Types/types";
import { statusData } from "../../data/statusDumy";
import { getPriorityColor } from "../../../../common/utils/taskPriorityColor";
import { SortableTask } from "./SortableTask";
import { DroppableColumn } from "./DroppableColumn";

/**
 * KanbanBoard Component
 * A dynamic Kanban board that allows tasks to be dragged and dropped across columns.
 * @param {KanbanBoardProps} props - The props for the component.
 * @param {Task[]} props.tasks - The list of tasks to be displayed on the board.
 * @param {(taskId: string, newStatus: string) => void} props.onTaskMove - Callback function triggered when a task is moved to a new column.
 * @returns {React.ReactElement} A fully functional Kanban board with drag-and-drop support.
 */
const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskMove }) => {
  // State to track the active task being dragged
  const [activeId, setActiveId] = useState<string | null>(null);
  // State to track the source column of the active task
  const [sourceColumn, setSourceColumn] = useState<string | null>(null);
  // State to track the target column where the task is being dropped
  const [targetColumn, setTargetColumn] = useState<string | null>(null);
  // Local state to manage tasks (to avoid direct mutation of props)
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);

  // Sync localTasks with the tasks prop whenever it changes
  React.useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  /**
   * Sensors for DndContext
   * Enables pointer and keyboard interactions for drag-and-drop.
   */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Minimum distance to start dragging (in pixels)
      },
    }),
    useSensor(KeyboardSensor) // Enables keyboard accessibility
  );

  /**
   * Memoized Columns
   * Dynamically generates columns based on predefined statuses (`statusData`) and filters tasks by their status.
   */
  const columns = useMemo(() => {
    return statusData.map((status) => ({
      id: status.id, // Unique ID for the column
      title: status.name, // Name of the column (e.g., "To Do", "In Progress")
      tasks: localTasks.filter((task) => task.status === status.name), // Tasks filtered by status
    }));
  }, [localTasks]);

  /**
   * Active Task
   * Memoized value to find the currently active task being dragged.
   */
  const activeTask = useMemo(
    () => localTasks.find((task) => task.id === activeId),
    [activeId, localTasks]
  );

  /**
   * Find Container
   * Helper function to determine the container (column) for a given task or column ID.
   * @param {string} id - The ID of the task or column.
   * @returns {string | undefined} The ID of the container (column) or undefined if not found.
   */
  const findContainer = (id: string) => {
    if (statusData.some((status) => status.id === id)) {
      return id; // If the ID belongs to a column, return the column ID
    }
    return columns.find((column) => column.tasks.some((task) => task.id === id))
      ?.id; // Otherwise, find the column containing the task
  };

  /**
   * Handle Drag Start
   * Called when a drag operation starts.
   * @param {DragStartEvent} event - The drag start event.
   */
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string); // Set the active task ID

    // Find the source column of the active task
    const task = localTasks.find((t) => t.id === active.id);
    const startColumn = statusData.find((s) => s.name === task?.status);
    if (startColumn) {
      setSourceColumn(startColumn.id); // Set the source column ID
    }
  };

  /**
   * Handle Drag Over
   * Called when a task is dragged over another task or column.
   * @param {DragOverEvent} event - The drag over event.
   */
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const overId = over.id as string;
    const overContainer = findContainer(overId);

    if (overContainer) {
      setTargetColumn(overContainer); // Set the target column ID
    }
  };

  /**
   * Handle Drag End
   * Called when a drag operation ends.
   * Updates the task's status and position if it was moved to a different column.
   * @param {DragEndEvent} event - The drag end event.
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      // Reset states if the task is not dropped over a valid target
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
          // Reorder tasks if dropped over another task
          const activeIndex = updatedTasks.indexOf(activeTask);
          const overIndex = updatedTasks.indexOf(overTask);
          const newTasks = arrayMove(updatedTasks, activeIndex, overIndex);
          setLocalTasks(newTasks);
          onTaskMove(activeTaskId, destinationColumn.name);
        } else {
          // Update task status without reordering
          setLocalTasks(updatedTasks);
          onTaskMove(activeTaskId, destinationColumn.name);
        }
      }
    }

    // Reset states after drag ends
    setActiveId(null);
    setSourceColumn(null);
    setTargetColumn(null);
  };

  /**
   * Handle Drag Cancel
   * Called when a drag operation is canceled (e.g., dropped outside a valid target).
   */
  const handleDragCancel = () => {
    setActiveId(null);
    setSourceColumn(null);
    setTargetColumn(null);
  };

  return (
    <DndContext
      sensors={sensors} // Sensors for pointer and keyboard interactions
      collisionDetection={rectIntersection} // Collision detection strategy
      onDragStart={handleDragStart} // Drag start handler
      onDragOver={handleDragOver} // Drag over handler
      onDragEnd={handleDragEnd} // Drag end handler
      onDragCancel={handleDragCancel} // Drag cancel handler
    >
      {/* Main container for the Kanban board */}
      <div className="flex overflow-x-auto space-x-6 p-4">
        {/* Render each column */}
        {columns.map((column) => (
          <DroppableColumn
            key={column.id}
            id={column.id}
            title={column.title}
            isDropTarget={
              targetColumn === column.id && sourceColumn !== column.id
            } // Highlight the target column
          >
            <SortableContext
              items={column.tasks.map((task) => task.id)} // Sortable tasks in the column
              strategy={verticalListSortingStrategy} // Sorting strategy
            >
              <div className="space-y-4">
                {/* Render tasks or placeholder if the column is empty */}
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

      {/* Drag Overlay for smooth dragging experience */}
      <DragOverlay
        dropAnimation={{
          duration: 300,
          easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
        }}
      >
        {/* Render the active task being dragged */}
        {activeTask ? (
          <Card className="shadow-xl rotate-3 bg-white w-72">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge className="mt-2 bg-blue-100 text-blue-800">
                  {activeTask.project}
                </Badge>
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
            </CardContent>
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
