"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Layers, Pin } from "lucide-react";
import ProjectCard from "./project-card";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios-instance";
import { ProjectType } from "@/types/project.type";

const Project = () => {
  const [data, setData] = useState<ProjectType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance<ProjectType[]>({
          url: "/project/mine",
        });
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const renderProjects = (pinned:boolean) =>
    data
      .filter((project) => project.pinned === pinned)
      .map((project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          status={project.status}
          tasksCompleted={project.tasksCompleted}
          totalTasks={project.totalTasks}
          progress={project.progress}
          updatedAt={project.updatedAt}
        />
      ));

  return (
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
          {renderProjects(true)}
        </div>

        <Button variant="ghost" className="flex items-center gap-2">
          <Layers /> Other Projects
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderProjects(false)}
        </div>
      </section>
    </div>
  );
};

export default Project;
