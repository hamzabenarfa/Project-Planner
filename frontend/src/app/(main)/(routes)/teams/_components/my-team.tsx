"use client";
import { Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import Toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddMember from "./add-member";
import { Team, TeamMember } from "@/types/team.type";

const MyTeam = () => {
  const [team, setTeam] = useState<Team | null>(null); 
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  useEffect(() => {
    getMyTeam();
    getMyTeamMembers();
  }, []);

  const getMyTeam = async () => {
    try {
      const response = await axiosInstance<Team>({ url: "/team/mine" });
      setTeam(response.data);
    } catch (error :any) {
      Toast.error(error.response.data.message);
    }
  };
  const getMyTeamMembers = async () => {
    try {
      const response = await axiosInstance<TeamMember[]>({ url: "/team-members/my-team" });
      setTeamMembers(response.data);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  return (
    <>
      {team && (
        <div className="flex flex-col w-full gap-10">
          <div className="flex flex-col w-full gap-1 p-3">
            <div className="flex items-center justify-between">
              <h1>{team.name}</h1>
              <div className="flex flex-row">
                <Button variant="ghost" size="icon">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Settings2 />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel className=" cursor-pointer">
                        Setting
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                     
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Button>
                <Button variant="ghost" size="icon">
                  <AddMember />
                </Button>
              </div>
            </div>
            <Separator />
          </div>

          <div className=" w-full">
            <Table>
              <TableCaption>A list of your Team members.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Id</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers &&
                  teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.id}</TableCell>
                      <TableCell>{member.user.email}</TableCell>
                      <TableCell>{member.user.role}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="destructive">Remove</Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default MyTeam;
