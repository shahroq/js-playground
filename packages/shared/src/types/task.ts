export const taskStatus = ["NEW", "IN_PROGRESS", "COMPLETED"] as const;
export type TaskStatus = (typeof taskStatus)[number];

export type Task = {
  id?: string | number;
  title: string;
  description: string;
  status?: TaskStatus;
  category?: string;
};

// sort
export const taskSortables = ["id", "title", "status"] as const;
export type TaskSortField = (typeof taskSortables)[number];
export type TaskSort = TaskSortField | `-${TaskSortField}`;

// parsed:
export type TaskQuery = {
  term?: string;
  status?: TaskStatus;
  page?: number;
  limit?: number;
  sort?: TaskSort;
};

export const taskInitValues: Task = {
  title: "new task",
  description: "",
  category: "work",
};
