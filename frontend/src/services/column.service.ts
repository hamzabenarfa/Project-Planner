import api from "@/lib/axios-instance";
import { Response } from "@/types/axios.types";
import { Id } from "@/types/kanban.type";
import { Column } from "@/types/column.type";
class ColumnService {
    async getColumns(projectId: Id): Promise<Response<Column[]>> {
        try {
            const response = await api<Column[]>({
                url: `/column/all/${projectId}`,
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

const columnService = new ColumnService();
export default columnService;
