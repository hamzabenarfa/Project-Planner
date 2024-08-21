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

import {  EllipsisVertical } from "lucide-react";

const TaskCardDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="icon" className=" bg-inherit">
          <EllipsisVertical className=" text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className=" w-full">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default TaskCardDrawer;
