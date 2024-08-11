"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import {
  EllipsisVertical,
  Pin,
  Projector,
  Settings,
  Trash2,
} from "lucide-react";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "@/types/kanban.type";

const statusColors: Record<string, string> = {
  BUILDING: "bg-yellow-100",
  INPROGRESS: "bg-blue-100",
  pending: "bg-gray-100",
  STARTED: "bg-blue-100",
  default: "bg-green-100",
} as const;

interface ProjectCardProps extends ProjectType {
  onDelete: (id: Id) => void;
  onPin: (id: Id) => void;
}

const ProjectCard = ({
  id,
  name,
  status,
  completedTasks,
  totalTasks,
  progress,
  pinned,
  updatedAt,
  onDelete,
  onPin,
}: ProjectCardProps) => {
  const router = useRouter();
  const formattedDate = formatDistanceToNow(new Date(updatedAt), {
    addSuffix: true,
  });
  const statusColorClass =
    statusColors[status.toLowerCase()] || statusColors.default;

  const navigateToProject = () => router.push(`/planner/project/${id}`);

  const handlePin = (id: Id) => {
    onPin(id);
  };
  const handleDelete = (id: Id) => {
    onDelete(id);
  };

  return (
    <Card className="py-8 cursor-pointer">
      <CardContent className="flex justify-between">
        <div className="flex gap-2 w-full" onClick={navigateToProject}>
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
        <Button variant="ghost" size="icon" asChild>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="size-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div
                  onClick={() => {
                    handlePin(id);
                  }}
                  className="flex items-center gap-1 cursor-pointer text-orange-400"
                >
                  <Pin size={18} /> {pinned ? "unpin" : "pin"}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuLabel>
                <div className="flex items-center gap-1 cursor-pointer">
                  <Settings size={18} /> Setting
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>
                <div
                  onClick={() => {
                    handleDelete(id);
                  }}
                  className="flex items-center gap-1 cursor-pointer text-red-600 "
                >
                  <Trash2 size={18} /> Delete
                </div>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </Button>
      </CardContent>

      <CardContent className="space-y-1">
        <div className="flex justify-between text-sm">
          <h1>{`${completedTasks}/${totalTasks} tasks completed`}</h1>
          <p>{`${progress}% completed`}</p>
        </div>
        <Progress value={progress} />
        <p>Last updated {formattedDate}</p>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
