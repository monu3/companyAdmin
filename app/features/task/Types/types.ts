export interface Task {
  id: string;
  content: string;
  status: string;
  priority: string;
  dueDate: string;
  project: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface CreateTaskFormProps {
  onAddTask: (task: Task) => void;
}

export interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: string) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onClose: () => void;
}

export interface ModalProps {
  task: Task;
  onClose: () => void;
}
