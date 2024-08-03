export type ProjectType = {
  id?: number;
  name: string;
  pinned: boolean;
  progress: number;
  status: string
  totalTasks: number;
  tasksCompleted: number;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
};
