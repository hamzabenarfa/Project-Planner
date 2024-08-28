import { Id } from "./kanban.type";

export enum Role {
  ADMIN,
  MEMBER,
  MANAGER,
}

export type User = {
  id: Id;
  email: string;
  role: Role;
};
