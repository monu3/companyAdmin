import exp from "constants";

export interface TaskHistory {
  id: number;
  taskTitle: string;
  companyId: number;
  action: string;
  updatedField: string;
  oldValue: string | null;
  newValue: string | null;
  timestamp: string;
}

export interface TaskHistoryContextType {
  taskHistory: TaskHistory[];
  refreshTaskHistory: () => void;
  loading: boolean;
  error: string | null;
}

export interface TaskHistoryFilterFormProps {
  onFilter: (filters: { title: string; status: string }) => void;
  onReset: () => void;
}

export interface TaskHistoryProps {
  filteredTasks: any[];
}
export interface TaskHistoryTimeFilterProps {
  onFilterChange: (filter: string) => void;
}
