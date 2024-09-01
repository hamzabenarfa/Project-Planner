"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProjectMembers } from "@/hooks/useProjectMembers";
import { ProjectMembers } from "@/types/project.type";
import { useParams } from "next/navigation";
import AssignMember from "./_components/assign-member";
import api from "@/lib/axios-instance";

import Toast from "react-hot-toast";
const TeamMembers = () => {
  const param = useParams();
  console.log(typeof param.id[0]);
  const { projectMembersData, isLoading, status, error } = useGetProjectMembers(
    parseInt(param.id[0])
  );

  const removeMember = async (teamId: number) => {
    try {
      const result = await api({
        url: `/project-memebers/remove-member/${teamId}`,
        method: "DELETE",
      });
      console.log(result);
      Toast.success(result.data.message);
    } catch (error: any) {
      console.log(error.response.data.message);
      Toast.error(error.response.data.message);
    }
  };
  return (
    <div className="space-y-4">
      <nav className="flex justify-between items-center">
        <Input
          type="search"
          placeholder="Search team members"
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <AssignMember />
      </nav>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-slate-100 ">
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center ">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectMembersData &&
              projectMembersData.data.map((team: ProjectMembers) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.id}</TableCell>
                  <TableCell>{team.user.email}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="destructive"
                      size="lg"
                      onClick={() => removeMember(team.id)}
                    >
                      Unassign{" "}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TeamMembers;
