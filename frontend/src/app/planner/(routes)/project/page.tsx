"use client";
import { Input } from "@/components/ui/input";
import { Layers, Pin } from "lucide-react";
import ProjectCard from "./project-card";
import { Button } from "@/components/ui/button";
import { fakeProjects } from "./fakedata";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";

type ProejctType = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
};
const Project = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance<ProejctType[]>("/project/mine");
        console.log("🚀 ~ fetchData ~ response:", response);

        setData(response.data);
      } catch (err) {
        console.log("🚀 ~ fetchData ~ err:", err);
      }
    };

    fetchData();
  }, []);

  console.log(data);

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
          {fakeProjects.map((project) => (
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
          {fakeProjects.map((project) => (
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
