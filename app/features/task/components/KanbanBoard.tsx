/**
 * KanbanBoard.tsx
 * Created On : 2025-24-01 12
 * Author : Diwash Pokhrel
 * Description : A dynamic Kanban board for managing tasks with drag-and-drop functionality.
 */
import React, { useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon, GripVertical } from "lucide-react";
import type { KanbanBoardProps } from "../Types/types";
import { statusData } from "../data/statusDumy";
import { getPriorityColor } from "../../../common/utils/taskPriorityColor";

/**
 * KanbanBoard Component
 * @param {KanbanBoardProps} props - The props object containing tasks and onTaskMove callback.
 */
const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskMove }) => {
  /**
   * Memoized Columns
   * Dynamically generates columns based on predefined statuses (`statusData`) and filters tasks by their status.
   */
  const columns = useMemo(() => {
    return statusData.map((status) => ({
      id: status.id, // Unique ID for the column (used in drag-and-drop)
      title: status.name, // Name of the column (e.g., "To Do", "In Progress")
      tasks: tasks.filter((task) => task.status === status.name), // Filter tasks by their current status
    }));
  }, [tasks]);

  /**
   * Handle Drag End Event
   * Called when a drag-and-drop action is completed.
   * Updates the task's status if it was moved to a different column.
   *
   * @param {Object} result - The result object from react-beautiful-dnd.
   */
  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    // If no destination or no change in position, exit early
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Find the new status based on the destination column ID
    const newStatus = statusData.find(
      (status) => status.id === destination.droppableId
    )?.name;

    // Call the callback function to update the task's status
    if (newStatus) {
      onTaskMove(draggableId, newStatus);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {/* Main container for the Kanban board */}
      <div className="flex overflow-x-auto space-x-6 p-4">
        {/* Render each column */}
        {columns.map((column) => (
          <div key={column.id} className="flex-none w-80">
            {/* Column title */}
            <h3 className="text-lg font-semibold mb-4 text-center">
              {column.title}
            </h3>
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 rounded-lg transition-colors ${
                    snapshot.isDraggingOver ? "bg-gray-200" : "bg-gray-100"
                  }`}
                >
                  {/* If no tasks in this column, show placeholder */}
                  {column.tasks.length === 0 ? (
                    <div className="flex items-center justify-center text-sm text-gray-500 h-full">
                      Drag tasks here
                    </div>
                  ) : (
                    column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`mb-4 ${
                              snapshot.isDragging
                                ? "rotate-3 shadow-xl bg-white"
                                : "shadow-sm"
                            }`}
                            style={{
                              ...provided.draggableProps.style,
                              transform: snapshot.isDragging
                                ? `${provided.draggableProps.style?.transform}`
                                : "none",
                            }}
                          >
                            <CardContent className="p-4">
                              {/* Drag handle for dragging */}
                              <div className="flex items-center justify-between mb-2">
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-grab"
                                >
                                  <GripVertical className="h-5 w-5 text-gray-500" />
                                </div>
                                {/* Priority badge */}
                                <Badge
                                  className={`${getPriorityColor(
                                    task.priority
                                  )}`}
                                >
                                  {task.priority}
                                </Badge>
                              </div>
                              {/* Task content */}
                              <h4 className="font-medium mb-2">
                                {task.content}
                              </h4>
                              {/* Due date */}
                              <div className="flex items-center text-sm text-gray-500">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                <span>
                                  {format(
                                    new Date(task.dueDate),
                                    "MMM d, yyyy"
                                  )}
                                </span>
                              </div>
                              {/* Project badge */}
                              <Badge className="mt-2 bg-blue-100 text-blue-800">
                                {task.project}
                              </Badge>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))
                  )}
                  {/* Placeholder for Droppable area */}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
