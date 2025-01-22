import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { Task } from "../Types/types";
import { dummyTasks } from "../data/dumyTask"; // Import dummy tasks
import TaskDetailModal from "./TaskDetailModal"; // Import TaskDetailModal
import { getPriorityColor } from "../../../common/utils/taskPriorityColor";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const ListTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Track the selected task
  const [showModal, setShowModal] = useState(false); // Track modal visibility

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const fetchedTasks = storedTasks ? JSON.parse(storedTasks) : [];
    setTasks([...dummyTasks, ...fetchedTasks]);
  }, []);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowModal(true); // Open the modal
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="h-auto px-2 md:px-4 dark:bg-[#494242]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Task List</h2>
        {/* Button to go to tasks page */}
        <Link to="/tasks">
          <Button variant={"secondary"}>Go to Tasks</Button>
        </Link>
      </div>

      <div className=" px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className="mb-4 shadow-md cursor-pointer"
            onClick={() => handleTaskClick(task)} // Open modal on task click
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge className={`${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </Badge>
              </div>
              <h4 className="font-medium mb-2">{task.content}</h4>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>{format(new Date(task.dueDate), "MMM d, yyyy")}</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                {task.project}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal for displaying task details */}
      {showModal && selectedTask && (
        <TaskDetailModal task={selectedTask} onClose={closeModal} />
      )}
    </div>
  );
};

export default ListTasks;
