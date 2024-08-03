"use client";
import { Input } from "@/components/ui/input";

import CreateNewTeam from "./_components/create-team";
import MyTeam from "./_components/my-team";

const Teams = () => {
  return (
    <div className="min-h-screen container">
      <section className="space-y-8 p-4">
        <div className="flex gap-2">
          <Input type="search" placeholder="Search Team Member" />
          <CreateNewTeam />
        </div>
        <MyTeam />
      </section>
    </div>
  );
};

export default Teams;
