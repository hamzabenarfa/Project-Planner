"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Toggle from './toggle'
import SelectForm from "./select-form";
import MemberForm from "./member-form";
import PlusIcon from "@/components/svg/plus-icon";

const AddMember = () => {
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger >
          <PlusIcon />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
            <DialogDescription className="flex flex-col items-center justify-center gap-1">
              Click on the toggle to change the form
              <Toggle enabled={enabled} setEnabled={setEnabled} />
            </DialogDescription>
          </DialogHeader>

          {enabled ? <SelectForm /> : <MemberForm />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddMember;
