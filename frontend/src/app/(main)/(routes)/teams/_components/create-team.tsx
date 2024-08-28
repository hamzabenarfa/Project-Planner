"use client";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import axiosInstance from "@/lib/axios-instance";

const CreateNewTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createNewTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance({
        url: "/team",
        method: "post",
        data: { name: teamName },
      });
      if (response.data) {
        Toast.success("Team created");
        setIsDialogOpen(false);
      }
    } catch (error : any) {
      Toast.error(error.response.data.message);
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <div
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setIsDialogOpen(true)}
        >
          New Team
        </div>
      </DialogTrigger>
      <DialogContent className=" space-y-4 py-8">
        <DialogHeader>
          <DialogTitle>Create new team</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={createNewTeam}
          className="flex flex-col items-start gap-4"
        >
          <div className="w-full space-y-2">
            <Label htmlFor="member">Team Name</Label>
            <Input
              id="member"
              type="text"
              placeholder=" Team Member Name"
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>

          <DialogFooter className=" w-full">
            <Button type="submit" className=" w-full">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewTeam;
