"use client"
import { Button } from "@/components/ui/button";
import SettingCard from "./setting-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePatchProjectName } from "@/hooks/useProject";
import { useState } from "react";

const ProjectNameSetting = ({id}:{id:number}) => {
    const [projectName, setProjectName] = useState("");
    const {patchProjectName, status, error} = usePatchProjectName();
    const handlePatchProjectName = () => {
      if (projectName) {
        patchProjectName({id, name: projectName});
      }
    }
  
    return ( 
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
     );
}
 
export default ProjectNameSetting;