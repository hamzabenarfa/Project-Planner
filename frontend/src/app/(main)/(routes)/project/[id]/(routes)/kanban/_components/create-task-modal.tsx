"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTask } from "@/hooks/useTask";
import { Id } from "@/types/kanban.type";
import { Task } from "@/types/task.type";
import { Plus } from "lucide-react";
import { useState } from "react";
import Toast from "react-hot-toast";
interface CreateTaskModalProps {
  projectId: Id;
}

export function CreateTaskModal({ projectId }: CreateTaskModalProps) {
  const { createTask, status, error } = useCreateTask();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [data, setData] = useState<Task>({
    name: "",
    description: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createTask(
      { projectId, data },
      {
        onSuccess() {
          Toast.success("Task created successfully");
          setIsDialogOpen(false);
        },
        onError() {
          Toast.error(error);
        },
      }
    );
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="  gap-2">
          <Plus />
          Create Tasks
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new Task</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new task.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="name" className="text-left">
              Title
            </Label>
            <Input
              id="name"
              placeholder="Enter task title"
              className="w-full"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="username" className="text-left">
              Description
            </Label>
            <Textarea
              id="username"
              placeholder="Type your description here..."
              className="w-full"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
