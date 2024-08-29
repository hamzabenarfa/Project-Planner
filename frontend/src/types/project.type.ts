import { Id } from "./kanban.type";

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

export interface PatchProjectName {
  id: Id;
  name: string;
}

export interface ProjectStatus {
  id: Id;
  status: string;
}
