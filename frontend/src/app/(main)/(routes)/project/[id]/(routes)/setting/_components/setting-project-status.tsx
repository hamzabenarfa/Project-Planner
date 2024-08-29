"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusColors } from "@/constants/statusColors";
import SettingCard from "./setting-card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  useGetProjectCurrentStatus,
  usePatchProjectStatus,
} from "@/hooks/useProject";
import { useEffect, useState } from "react";

const ProjectStatusSetting = ({ id }: { id: number }) => {
  const { projectData, isLoading, status, error } =
    useGetProjectCurrentStatus(id);
  const {
    patchProjectStatus,
    status: patchStatus,
    error: patchError,
  } = usePatchProjectStatus();

  const [currentProjectStatus, setCurrentProjectStatus] = useState<string>("");
  useEffect(() => {
    if (!isLoading && projectData && currentProjectStatus === "") {
      setCurrentProjectStatus(projectData.data);
    }
  }, [projectData, isLoading, currentProjectStatus]);

  const handleStatusChange = (value: string) => {
    setCurrentProjectStatus(value);
  };

  const handleUpdateStatus = () => {
    patchProjectStatus({ id, status: currentProjectStatus });
  };

  if (error) return <div>Error: {error.message}</div>;
  return (
    <SettingCard
      name="Project Status"
      description="To update your project status select from the options below"
    >
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="status">Project Status</Label>
        <div className="flex items-center gap-1.5">
          <Select
            value={currentProjectStatus}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-80 h-11">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status Options</SelectLabel>
                {Object.entries(statusColors).map(([statusKey, colorClass]) => (
                  <SelectItem
                    key={statusKey}
                    value={statusKey}
                    className="cursor-pointer"
                  >
                    <p
                      className={`text-sm text-gray-500 rounded-full w-fit px-2 py-1 ${colorClass}`}
                    >
                      {statusKey}
                    </p>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            size="lg"
            onClick={handleUpdateStatus}
            disabled={patchStatus === "pending"}
          >
            {patchStatus === "pending" ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </SettingCard>
  );
};

export default ProjectStatusSetting;
