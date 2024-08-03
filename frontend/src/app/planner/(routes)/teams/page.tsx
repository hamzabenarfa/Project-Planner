"use client";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import CreateNewTeam from "./_components/create-team";


const Teams = () => {
  
  return (
    <div className="min-h-screen container">
      <section className="space-y-8 p-4">
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Search Team Member"
           
          />

         <CreateNewTeam />
        </div>

        <div className="flex items-center justify-between">
          <h1>Team Name</h1>
          <ChevronDown />
        </div>
      </section>
    </div>
  );
};

export default Teams;
