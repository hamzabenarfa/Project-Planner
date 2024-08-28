import api from "@/lib/axios-instance";
import { Response } from "@/types/axios.types";
import { Id } from "@/types/kanban.type";
import { Task } from "@/types/task.type";
class TaskService {
  async addTask(projectId: Id, data: Task): Promise<Response<Task>> {
    try {
      const response = await api<Task>({
        url: `/tasks/add-by-project/${projectId}`,
        method: "POST",
        data,
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

const taskService = new TaskService();
export default taskService;
