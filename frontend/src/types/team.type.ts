import { Id } from "./kanban.type";
import { User } from "./user.type";

export type Team = {
  id: Id;
  name: string;
  ownerId?: Id;
};

export type TeamMember = {
  id: Id;
  userId: Id;
  teamId: Id;
  user: User;
};