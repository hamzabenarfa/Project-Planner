import teamMembers from "@/services/team-members.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-hot-toast";

export const useGetTeamMembers = () => {
  const { data, isLoading, status, error } = useQuery({
    queryKey: ["team-members"],
    queryFn: () => teamMembers.getMyTeam(),
  });
  return { teamMembersData: data, isLoading, status, error };
};
