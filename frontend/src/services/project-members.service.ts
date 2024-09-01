import api from "@/lib/axios-instance";
import { Response } from "@/types/axios.types";
import { Id } from "@/types/kanban.type";
import { ProjectMembers } from "@/types/project.type";
class ProjectMembersService {
    async getProjectMembers(projectId: number): Promise<Response<ProjectMembers[]>> {
        try {
            const response = await api<ProjectMembers[]>({
                url: `/project-memebers/${projectId}/members`,
                method: "GET",
            });
            return {
                success: true,
                data: response.data,
            };
        } catch (error: any) {
            throw error.response.data.message;
        }
    }
}

const projectMembersService = new ProjectMembersService();
export default projectMembersService;
