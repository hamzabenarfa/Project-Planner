"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Task } from "@/types/task.type";
import { Settings } from "lucide-react";
import TaskDrawerNavbar from "./task-drawer-navbar";
import { Separator } from "@/components/ui/separator";
import TaskDrawerBody from "./task-drawer-body";

const TaskCardDrawer = ({ task }: { task: Task }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className=" bg-inherit" asChild>
          <Settings className=" text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="rounded-l-3xl w-full  min-w-[80%] overflow-auto">
        <SheetHeader className="">
          <TaskDrawerNavbar task={task} />
        </SheetHeader>
        <Separator />

        <TaskDrawerBody task={task} />
      </SheetContent>
    </Sheet>
  );
};

export default TaskCardDrawer;
