import projectService from "@/services/project.service";
import { Id } from "@/types/kanban.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useGetAllMyProject = () => {
  const { data, isLoading, status, error } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getProjects(),
  });
  return { projectData: data, isLoading, status, error };
};


export const usePinProject = () => {
  const queryClient = useQueryClient();
  const { mutate, status, error } = useMutation({
    mutationKey: [`pin-project`],
    mutationFn: (id: Id) => projectService.togglePinProject(id),
    onSettled: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  });
  return { pinProject: mutate, status, error };
}


export const useDeleteProject = () => {
  const { mutate, status, error } = useMutation({
    mutationKey: [`delete-project`],
    mutationFn: (id: Id) => projectService.deleteProject(id),
   
  });
  return { deleteProject: mutate, status, error };
};