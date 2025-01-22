import React, { useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon, GripVertical } from "lucide-react";
import type { KanbanBoardProps } from "../Types/types";
import { statusData } from "../data/statusDumy";
import { getPriorityColor } from "../../../common/utils/taskPriorityColor";


const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskMove }) => {
  const columns = useMemo(() => {
    return statusData.map((status) => ({
      id: status.id,
      title: status.name,
      tasks: tasks.filter((task) => task.status === status.name),
    }));
  }, [tasks]);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newStatus = statusData.find(
      (status) => status.id === destination.droppableId
    )?.name;
    if (newStatus) {
      onTaskMove(draggableId, newStatus);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex overflow-x-auto space-x-4 p-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-none w-80">
            <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
            <Droppable droppableId={column.id} isDropDisabled={false}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 rounded-lg min-h-[500px] ${
                    snapshot.isDraggingOver ? "bg-gray-50" : "bg-gray-100"
                  }`}
                >
                  {column.tasks.length === 0 ? (
                    <div className="flex items-center justify-center text-sm text-gray-500">
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
                            className={`mb-3 ${
                              snapshot.isDragging ? "rotate-3 shadow-lg" : ""
                            }`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-grab"
                                >
                                  <GripVertical className="h-5 w-5 text-gray-500" />
                                </div>
                                <Badge
                                  className={`${getPriorityColor(
                                    task.priority
                                  )}`}
                                >
                                  {task.priority}
                                </Badge>
                              </div>
                              <h4 className="font-medium mb-2">
                                {task.content}
                              </h4>
                              <div className="flex items-center text-sm text-gray-500">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                <span>
                                  {format(
                                    new Date(task.dueDate),
                                    "MMM d, yyyy"
                                  )}
                                </span>
                              </div>
                              <Badge className="mt-2 bg-blue-100 text-blue-800">
                                {task.project}
                              </Badge>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))
                  )}
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
