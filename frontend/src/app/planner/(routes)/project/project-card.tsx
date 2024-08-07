"use client";

import { useRouter } from "next/navigation";

import { FC } from "react";
import { EllipsisVertical, Pin, Projector, Settings, Settings2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProjectType } from "@/types/project.type";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

const ProjectCard: FC<ProjectType> = ({
  id,
  name,
  status,
  tasksCompleted,
  totalTasks,
  progress,
  updatedAt,
}) => {
  let statusColorClass = "";

  switch (status.toLowerCase()) {
    case "building":
      statusColorClass = "bg-yellow-100";
      break;
    case "in progress":
      statusColorClass = "bg-blue-100";
      break;
    case "pending":
      statusColorClass = "bg-gray-100";
      break;
    default:
      statusColorClass = "bg-green-100";
      break;
  }
  const formattedDate = formatDistanceToNow(new Date(updatedAt), {
    addSuffix: true,
  });
  const router = useRouter();

  return (
    <Card className="py-8 cursor-pointer">
      <CardContent className="flex justify-between">
        <div
          className="flex gap-2 w-full"
          onClick={() => router.push(`/planner/project/${id}`)}
        >
          <Projector className="aspect-square size-10" />
          <div>
            <h1 className="text-lg font-bold">{name}</h1>
            <p
              className={`text-sm text-gray-500 rounded-full w-fit px-2 ${statusColorClass}`}
            >
              {status}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="size-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className=" ">
                <div className="flex flex-row items-center gap-1 cursor-pointer text-orange-400 ">
                  <Pin size={18} /> Unpin
                </div>
              </DropdownMenuLabel>
              <DropdownMenuLabel className="">
                
                <div className="flex flex-row items-center gap-1 cursor-pointer  ">
                  <Settings size={18} /> Setting
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className=" ">
              <div className="flex flex-row items-center gap-1 cursor-pointer text-red-600 ">
                  <Trash2 size={18} /> Delete
                </div>
                
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </Button>
      </CardContent>

      <CardContent
        className="space-y-1"
        onClick={() => router.push(`/planner/project/${id}`)}
      >
        <div className="flex justify-between text-sm">
          <h1>{`${tasksCompleted}/${totalTasks} tasks completed`}</h1>
          <p>{`${progress}% completed`}</p>
        </div>
        <Progress value={progress} className="" />
        <p>Last updated {formattedDate}</p>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
