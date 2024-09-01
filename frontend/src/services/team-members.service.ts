import api from "@/lib/axios-instance";
import { Response } from "@/types/axios.types";
import { TeamMembersType } from "@/types/team-members";

class TeamMembers {
  async getMyTeam(): Promise<Response<TeamMembersType>> {
    try {
      const response = await api<TeamMembersType>({
        url: `/team-members/my-team`,
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

const teamMembers = new TeamMembers();
export default teamMembers;
