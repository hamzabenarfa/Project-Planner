import projectMembersService from "@/services/project-members.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-hot-toast";

export const useGetProjectMembers = (projectId: number) => {
  const { data, isLoading, status, error } = useQuery({
    queryKey: ["project-members", projectId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return  projectMembersService.getProjectMembers(id as number);
    },
  });
  return { projectMembersData: data, isLoading, status, error };
};
