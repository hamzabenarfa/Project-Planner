import { Id } from "@/types/kanban.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import taskService from "@/services/task.service";
import { Task } from "@/types/task.type";

interface CreateTaskVariables {
  projectId: Id;
  data: Task;
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate, status, error } = useMutation({
    mutationKey: [`create-task`],
    mutationFn: ({ projectId, data }: CreateTaskVariables) =>
      taskService.addTask(projectId, data),
    onSettled: (data, error, variables) => {
      if (variables) {
        queryClient.invalidateQueries({ queryKey: ["columns", variables.projectId] });
      }
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      console.log(error);
    }
  });
  return { createTask: mutate, status, error };
};
