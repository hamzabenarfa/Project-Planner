import api from "@/lib/axios-instance";
import { Response } from "@/types/axios.types";
import { Id } from "@/types/kanban.type";
import { ProjectType } from "@/types/project.type";

class ProjectService {
  async getProjects(): Promise<Response<ProjectType[]>> {
    try {
      const response = await api.get<ProjectType[]>("/project/progress");
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
  async getPinnedProjects(): Promise<Response<ProjectType[]>> {
    try {
      const response = await api.get<ProjectType[]>("/project/pinned");
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
  async getUnpinnedProjects(): Promise<Response<ProjectType[]>> {
    try {
      const response = await api.get<ProjectType[]>("/project/unpinned");
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
  async deleteProject(id: Id): Promise<Response<String>> {
    try {
      const response = await api.delete<string>(`/project/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
  async togglePinProject(projectId: Id): Promise<Response<ProjectType>> {
    try {
      const response = await api.put<ProjectType>(`/project/pin/${projectId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
  async createProject(projectName: string): Promise<Response<ProjectType>> {
    try {
      const response = await api.post<ProjectType>("/project", {
        name: projectName,
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
  async patchProjectName(projectId: Id, projectName: string): Promise<Response<string>> {
    try {
      const response = await api.patch<string>(`/project/${projectId}/name`, {
        name: projectName,
      });
      console.log("🚀 ~ ProjectService ~ patchProjectName ~ response:", response)
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      throw error.response.data.message;
    }
  }

}

export default new ProjectService();
