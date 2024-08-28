import { Id } from "@/types/kanban.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import columnService from "@/services/column.service";

export const useGetAllMyColumn = (projectId: Id) => {
    const { data, isLoading, status, error } = useQuery({
        queryKey: ["columns",projectId],
        queryFn: () => columnService.getColumns(projectId),
    });
    return { columnData: data, isLoading, status, error };
};
