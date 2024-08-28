
import { Input } from "@/components/ui/input";
import { Layers, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; 

const ProjectSkeleton = () => {
  return (
    <div className="min-h-screen container">
        <section className="space-y-4 p-4">
    <div className="min-h-screen container">
      <section className="space-y-4 p-4">
        <div className="flex gap-2">
          <Input type="search" placeholder="Search Project" />
          <Button>New Project</Button>
        </div>

        <Button variant="ghost" className="flex items-center gap-2">
          <Pin /> Pinned Projects
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProjectSCardkeleton />
          <ProjectSCardkeleton />
          <ProjectSCardkeleton />
        </div>

        <Button variant="ghost" className="flex items-center gap-2">
          <Layers /> Other Projects
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProjectSCardkeleton />
          <ProjectSCardkeleton />
        </div>
      </section>
    </div>
    </section>
    </div>
  );
};

export default ProjectSkeleton;

export const ProjectSCardkeleton = () => {
  return (
    <Card className="py-8 cursor-pointer">
      <CardContent className="flex justify-between">
        <div className="flex gap-2 w-full">
          <Skeleton className="h-10 w-10 rounded-full" />{" "}
          {/* Placeholder for Projector icon */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />{" "}
            {/* Placeholder for project name */}
            <Skeleton className="h-4 w-1/3" />{" "}
            {/* Placeholder for project status */}
          </div>
        </div>
        <Skeleton className="h-6 w-6 rounded-full" />{" "}
        {/* Placeholder for dropdown menu */}
      </CardContent>

      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <Skeleton className="h-4 w-1/2" />{" "}
          {/* Placeholder for tasks completed */}
          <Skeleton className="h-4 w-1/4" />{" "}
          {/* Placeholder for progress percentage */}
        </div>
        <Skeleton className="h-2 w-full" /> {/* Placeholder for progress bar */}
        <Skeleton className="h-4 w-1/2" />{" "}
        {/* Placeholder for last updated text */}
      </CardContent>
    </Card>
  );
};