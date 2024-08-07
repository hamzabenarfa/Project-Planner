"use client"
import { Button } from "@/components/ui/button";
import { Bell, Folders, User2, Users } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-around p-4 border-b border-gray-300 backdrop-blur-sm bg-white bg-opacity-20 z-50 h-16">
      
      <div className="flex flex-row items-center gap-4">
        <div className="text-xl">DevSync</div>
        <p>/</p>
        <div className=" flex items-center gap-1">

        <Avatar className=" size-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>Hamza Benarfa</p>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center ">
        <Button
          asChild
          variant="ghost"
          className="flex flex-row items-center justify-center gap-1"
        >
          <Link href="/planner/project">
            <Folders />
            <p>Projects</p>
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="flex flex-row items-center justify-center gap-1"
        >
          <Link href="/planner/teams">
            <Users />
            <p>Teams</p>{" "}
          </Link>
        </Button>
      </div>

      <div className="flex flex-row items-center justify-center gap-4">
        <Bell />
        <Avatar className="">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
