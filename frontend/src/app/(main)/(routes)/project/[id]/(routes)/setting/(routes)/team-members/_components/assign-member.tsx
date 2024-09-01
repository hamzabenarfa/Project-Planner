"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectMember from "./select-member";

const AssignMember = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8" >Assign Member</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Member</DialogTitle>
        </DialogHeader>
        <DialogDescription>
            Select a member to assign to this project.
        </DialogDescription>
          <SelectMember />
      </DialogContent>
    </Dialog>
  );
};

export default AssignMember;
