"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";

import { useState } from "react";
import Main from "./_dashboard/main";

const Profile = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className=" p-4 flex flex-row divide-x min-h-screen">
      <div className=" w-80"></div>
      <Main />

      <section className="flex flex-col gap-6 p-4 w-80">
        <nav className="flex flex-row justify-between">
          <h1>My meetings</h1>
          <Button variant="outline" className="rounded-full" size="icon">
            <CalendarDays />
          </Button>
        </nav>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </section>
    </div>
  );
};

export default Profile;
