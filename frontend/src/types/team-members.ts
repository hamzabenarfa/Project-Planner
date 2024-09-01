import { Id } from "./kanban.type"
import { User } from "./user.type";

export type TeamMembersType = {
    id:Id;
    userId:Id;
    teamId:Id;
    user:User

}