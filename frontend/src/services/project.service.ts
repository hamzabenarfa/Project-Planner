import api from "@/lib/axios-instance";
import { Response } from "@/types/axios.types";
import { Id } from "@/types/kanban.type";
import { ProjectType } from "@/types/project.type";

class ProjectService {
  async getProjects(): Promise<Response<ProjectType[]>> {
    try {
      const response = await api.get<ProjectType[]>("/project/mine/all");
      return {
        success: true,
        data: response.data,
      };
    } catch (error:any) {
      return {
        success: false,
        data: error.data,
      };
    }
  }

  async getPinnedProjects(): Promise<Response<ProjectType[]>> {
    try {
      const response = await api.get<ProjectType[]>("/project/pinned");
      return {
        success: true,
        data: response.data,
      };
    } catch (error:any) {
      return {
        success: false,
        data: error.data,
      };
    }
  }
  async getUnpinnedProjects(): Promise<Response<ProjectType[]>> {
    try {
      const response = await api.get<ProjectType[]>("/project/unpinned");
      return {
        success: true,
        data: response.data,
      };
    } catch (error:any) {
      return {
        success: false,
        data: error.data,
      };
    }
  }
  async deleteProject(id: Id): Promise<Response<String>> {
    try {
      const response = await api.delete<string>(`/project/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error:any) {
      return {
        success: false,
        data: error.data,
      };
    }
  }
  async togglePinProject(projectId: Id): Promise<Response<ProjectType>> {
    try {
      const response = await api.put<ProjectType>(`/project/pin/${projectId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error:any) {
      return {
        success: false,
        data: error.data,
      };
    }
  }
}

export default new ProjectService();
