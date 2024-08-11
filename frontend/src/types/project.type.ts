export type ProjectType = {
  id?: number;
  name: string;
  pinned?: boolean;
  progress: number;
  status: string
  totalTasks: number;
  completedTasks: number;
  createdAt?: Date;
  updatedAt: Date;
  ownerId?: number;
};
