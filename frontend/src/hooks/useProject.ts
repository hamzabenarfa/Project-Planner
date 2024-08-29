import projectService from "@/services/project.service";
import { Id } from "@/types/kanban.type";
import { PatchProjectName, ProjectStatus } from "@/types/project.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-hot-toast";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { mutate, status, error } = useMutation({
    mutationKey: [`create-project`],
    mutationFn: (name: string) => projectService.createProject(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
  return { createProject: mutate, status, error };
};

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
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
  return { pinProject: mutate, status, error };
};

export const useDeleteProject = () => {
  const { mutate, status, error } = useMutation({
    mutationKey: [`delete-project`],
    mutationFn: (id: Id) => projectService.deleteProject(id),
  });
  return { deleteProject: mutate, status, error };
};

export const usePatchProjectName = () => {
  const { mutate, status, error } = useMutation({
    mutationKey: [`patch-project-name`],
    mutationFn: ({ id, name }: PatchProjectName) =>
      projectService.patchProjectName(id, name),
  });
  return { patchProjectName: mutate, status, error };
};

export const usePatchProjectStatus = () => {
  const queryClient = useQueryClient();
  const { mutate, status, error } = useMutation({
    mutationKey: [`patch-project-status`],
    mutationFn: ({ id, status }: ProjectStatus) =>
      projectService.patchProjectStatus(id, status),

    onSuccess: () => {
      Toast.success("Project status updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["projects", "patch-project-status"],
      });
    },
    onError: (error) => {
      Toast.error(error); 
    },
  });
  return { patchProjectStatus: mutate, status, error };
};

export const useGetProjectCurrentStatus = (projectId: number) => {
  const { data, isLoading, status, error } = useQuery({
    queryKey: ["projects_status", projectId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return projectService.getProjectCurrentStatus(id as number);
    },
  });
  return { projectData: data, isLoading, status, error };
};
