import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProject } from "@/hooks/useProject";

export function CreateNewProjectModal() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">New Project</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              Add a new project to your workspace. Start by giving it a name.
            </DialogDescription>
          </DialogHeader>
          <ProjectForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">New Project</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>New Project</DrawerTitle>
          <DrawerDescription>
            Add a new project to your workspace. Start by giving it a name.
          </DrawerDescription>
        </DrawerHeader>
        <ProjectForm className="px-4" onClose={() => setOpen(false)} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
import Toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
interface ProjectFormProps {
  className?: string;
  onClose?: () => void;
}
function ProjectForm({ className, onClose }: ProjectFormProps) {
  const { createProject, status, error } = useCreateProject();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("projectName") as string;
    createProject(name, {
      onSuccess: () => {
        Toast.success("Project created successfully");
        onClose?.();
      },
      onError: (error: any) => {
        Toast.error(error);
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="projectName">Name</Label>
        <Input type="text" id="projectName" name="projectName" />
      </div>


      <Button disabled={status === "pending"} type="submit">
        {status === "pending" ? <Loader2 className="mx-auto animate-spin" /> : "Save changes"}
        
      </Button>
    </form>
  );
}
