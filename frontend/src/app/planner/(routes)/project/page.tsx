"use client";

import { Input } from "@/components/ui/input";
import { Layers, Pin } from "lucide-react";
import ProjectCard from "./project-card";
import { Button } from "@/components/ui/button";
import { useDeleteProject, useGetAllMyProject, usePinProject } from "@/hooks/useProject";
import ProjectSkeleton from "./ProjectSkeleton";
import { useEffect, useState } from "react";
import { Id } from "@/types/kanban.type";
import { ProjectType } from "@/types/project.type";
import Toast from "react-hot-toast";
import { CreateNewProjectModal } from "./new-project-modal";
const Project = () => {
  const { projectData, isLoading, error } = useGetAllMyProject();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const { deleteProject } = useDeleteProject();
  const { pinProject } = usePinProject();

  useEffect(() => {
    if (projectData && Array.isArray(projectData.data)) {
      setProjects(projectData.data);
    }
  }, [projectData]);

  const handleDelete = (id: Id) => {
    deleteProject(id, {
      onSuccess: () => {
        Toast.success("Project deleted successfully");
        setProjects(prevProjects => 
          Array.isArray(prevProjects) ? prevProjects.filter(project => project.id !== id) : []
        );
      },
      onError: (error) => {
        console.error("Failed to delete project:", error);
      }
    });
  };
  const handlePin = (id: Id) => {
    pinProject(id, {
      onSuccess: () => {
        Toast.success("Project pinned successfully");
      },
      onError: (error) => {
        console.error("Failed to pin project:", error);
      }
    });
  };
  if (isLoading) {
    return (
      <div className="min-h-screen container">
        <section className="space-y-4 p-4">
          <ProjectSkeleton />
        </section>
      </div>
    );
  }

  const renderProjects = (pinned: boolean) => {
    if (projects && Array.isArray(projects)) {
      return projects
        .filter((project) => project.pinned === pinned)
        .map((project) => (
          <ProjectCard
            id={project.id}
            key={project.id}
            pinned={project.pinned}
            name={project.name}
            status={project.status}
            completedTasks={project.completedTasks}
            totalTasks={project.totalTasks}
            progress={project.progress}
            updatedAt={project.updatedAt}
            onDelete={handleDelete}
            onPin={handlePin}
          />
        ));
    }
    return null;
  };

  return (
    <div className="min-h-screen container">
      <section className="space-y-4 p-4">
        <div className="flex gap-2">
          <Input type="search" placeholder="Search Project" />
          <CreateNewProjectModal />
         
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
