/**
 * types.ts
 * Created On : 2025-24-01 12
 * Author : Diwash Pokhrel
 * Description : This module defines TypeScript interfaces for task management components.
 */

/**
 * Task Interface
 * Represents a task in the task management system.
 * Note: The datatype of `id` may change based on how data is structured in the backend.
 */
export interface Task {
  id: string; // Unique identifier for the task (may change to a different type, e.g., number)
  content: string; // Description of the task
  status: string; // Current status of the task (e.g., To-Do, In Progress)
  priority: string; // Priority level of the task (e.g., High, Medium, Low)
  dueDate: string; // Due date for the task in YYYY-MM-DD format
  project: string; // Associated project for the task
}

/**
 * Column Interface
 * Represents a column in the Kanban board, containing multiple tasks.
 * Note: The datatype of `id` may change based on how data is structured in the backend.
 */
export interface Column {
  id: string; // Unique identifier for the column (may change to a different type)
  title: string; // Title of the column (e.g., To-Do, In Progress)
  tasks: Task[]; // Array of tasks associated with this column
}

/**
 * CreateTaskFormProps Interface
 * Props for the CreateTaskForm component.
 */
export interface CreateTaskFormProps {
  onAddTask: (task: Task) => void; // Callback function to handle adding a new task
}

/**
 * KanbanBoardProps Interface
 * Props for the KanbanBoard component.
 */
export interface KanbanBoardProps {
  tasks: Task[]; // Array of tasks to be displayed on the board
  onTaskMove: (taskId: string, newStatus: string) => void; // Callback function to handle moving a task to a new status
}

/**
 * TaskListProps Interface
 * Props for the TaskList component.
 */
export interface TaskListProps {
  tasks: Task[]; // Array of tasks to be displayed in the list
  onClose: () => void; // Callback function to close the task list modal or component
}

/**
 * ModalProps Interface
 * Props for modal components displaying task details.
 */
export interface ModalProps {
  task: Task; // The task object to display in the modal
  onClose: () => void; // Callback function to close the modal
}
