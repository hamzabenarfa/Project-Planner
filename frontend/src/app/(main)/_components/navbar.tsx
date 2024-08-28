"use client";
import { Button } from "@/components/ui/button";
import { Bell, Folders, Users } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileDropdownMenu from "./profile-dropdown-menu";

const Navbar = () => {
  return (
    <nav
      className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 border-b 
                  border-gray-300 backdrop-blur-sm bg-white bg-opacity-20 z-50 h-16"
    >
      <div className="flex flex-row items-center gap-4">
        <div className="text-xl">DevSync</div>
        {/* <p>/</p>
        <div className=" flex items-center gap-1">
          <Avatar className=" size-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button variant="link" asChild>
            <Link href="/profile">Hamza Benarfa</Link>
          </Button>
        </div> */}
      </div>

      <div className="flex flex-row justify-center items-center ">
        <Button
          asChild
          variant="ghost"
          className="flex flex-row items-center justify-center gap-1"
        >
          <Link href="/project">
            <Folders />
            <p>Projects</p>
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="flex flex-row items-center justify-center gap-1"
        >
          <Link href="/teams">
            <Users />
            <p>Teams</p>
          </Link>
        </Button>
        
      </div>

      <div className="flex flex-row items-center justify-center gap-4">
        <Bell />
        <ProfileDropdownMenu />
      </div>
    </nav>
  );
};

export default Navbar;
