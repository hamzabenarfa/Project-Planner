import { Input } from "@/components/ui/input";
import { Layers, Pin } from "lucide-react";
import ProjectCard from "./project-card";
import { Button } from "@/components/ui/button";
import {fakeProjects} from "./fakedata"
const Project = () => {
  return (
    <div className="  min-h-screen container ">
      <section className=" space-y-4 p-4">
        <div className="flex gap-2">
          <Input type="search" placeholder="Search Project" />
          <Button>New Project</Button>
        </div>

        <div className=" flex items-center justify-start">
          <Pin /> Pinned Projects{" "}
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fakeProjects.map(project => (
            <ProjectCard
              key={project.id}
              title={project.title}
              status={project.status}
              tasksCompleted={project.tasksCompleted}
              totalTasks={project.totalTasks}
              progress={project.progress}
              lastUpdated={project.lastUpdated}
            />
          ))}
          
        </div>
        <div className=" flex items-center justify-start">
          <Layers /> Other Projects{" "}
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fakeProjects.map(project => (
            <ProjectCard
              key={project.id}
              title={project.title}
              status={project.status}
              tasksCompleted={project.tasksCompleted}
              totalTasks={project.totalTasks}
              progress={project.progress}
              lastUpdated={project.lastUpdated}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Project;
