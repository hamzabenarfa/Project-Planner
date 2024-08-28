import { Id } from "./kanban.type";

export type Task = {
    id?: Id;
    columnId?: Id;
    description?: string;
    
    name: string;
  };
  