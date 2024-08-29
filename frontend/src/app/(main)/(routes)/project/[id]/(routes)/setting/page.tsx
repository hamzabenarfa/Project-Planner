"use client";
import { Button } from "@/components/ui/button";
import SettingCard from "./_components/setting-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useParams } from "next/navigation";
import ProjectStatusSetting from "./_components/setting-project-status";
import ProjectNameSetting from "./_components/setting-project-name";
import ProjectDeleteSetting from "./_components/setting-delete-project";

const Setting = () => {
  const param = useParams();
  const projectIid = parseInt(param.id[0]);

  return (
    <div className="space-y-4">
      <ProjectNameSetting id={projectIid} />

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

      <ProjectStatusSetting id={projectIid} />

      <ProjectDeleteSetting id={projectIid} />
    </div>
  );
};

export default Setting;
