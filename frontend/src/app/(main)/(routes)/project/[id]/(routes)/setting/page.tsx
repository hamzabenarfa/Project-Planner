"use client"
import { Button } from "@/components/ui/button";
import SettingCard from "./_components/setting-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { usePatchProjectName } from "@/hooks/useProject";
import { useState } from "react";
import { useParams } from "next/navigation";

const Setting = () => {
  const param = useParams();
  const [projectName, setProjectName] = useState("");
  const {patchProjectName, status, error} = usePatchProjectName();
  const handlePatchProjectName = () => {
    if (projectName) {
      patchProjectName({id: parseInt(param.id[0]), name: projectName});
    }
  }


  return (
    <div className="space-y-4">
      <SettingCard
        name="Project Name"
        description="To update your project name, please fill the form below"
      >
        <div className="flex flex-col space-y-1.5 w-1/2">
          <Label htmlFor="name">Name</Label>
          <div className="flex items-center gap-1.5">
            <Input
              id="name"
              placeholder="Name of your project"
              className="h-11"
              onChange={(e) => setProjectName(e.target.value)}
            />
            <Button size="lg" onClick={handlePatchProjectName}>Update</Button>
          </div>
        </div>
      </SettingCard>

      <SettingCard
        name="Project Icon"
        description="To update your project icon, upload here"
      >
        <div className="flex flex-col space-y-1.5 w-1/2">
          <Label htmlFor="icon">Project Icon</Label>
          <div className="flex items-center gap-1.5">
            <Input
              id="icon"
              className="h-11"
              type="file"
              placeholder="upload icon here"
            />
            <Button size="lg">Upload</Button>
          </div>
        </div>
      </SettingCard>

      <SettingCard
        name="Project Status"
        description="To update your project status select from the options below"
      >
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Project Status</Label>
          <div className="flex items-center gap-1.5">
            <Select>
              <SelectTrigger className="w-80  h-11">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status Options</SelectLabel>
                  {Object.entries(statusColors).map(
                    ([statusKey, colorClass]) => (
                      <SelectItem
                        key={statusKey}
                        value={statusKey}
                        className=" cursor-pointer"
                      >
                        <p
                          className={`text-sm text-gray-500 rounded-full w-fit px-2 py-1 ${colorClass}`}
                        >
                          {statusKey}
                        </p>
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button size="lg">Update</Button>
          </div>
        </div>
      </SettingCard>

      <SettingCard
        name="Delete Project"
        description="To delete your project, click the button below"
      >
        <div className="flex items-center gap-1">
          <Button size="lg" variant="destructive">
            Delete Project
          </Button>
        </div>
      </SettingCard>
    </div>
  );
};

export default Setting;
