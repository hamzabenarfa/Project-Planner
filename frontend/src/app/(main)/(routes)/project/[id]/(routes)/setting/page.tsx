"use client";
import { Button } from "@/components/ui/button";
import SettingCard from "./_components/setting-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import { useParams } from "next/navigation";
import SettingProjectStatus from "./_components/setting-project-status";
import SettingProjectName from "./_components/setting-project-name";

const Setting = () => {
  const param = useParams();
  const projectIid = parseInt(param.id[0]);

  return (
    <div className="space-y-4">
      <SettingProjectName id={projectIid} />

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

      <SettingProjectStatus id={projectIid} />

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
