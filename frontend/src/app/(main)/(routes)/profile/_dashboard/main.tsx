import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  CalendarCheck,
  Check,
  CheckCheck,
  CircleUser,
  Settings,
  Timer,
  User,
  Users,
} from "lucide-react";
const Main = () => {
  return (
    <section className=" w-full p-4 ">
      <nav className=" flex flex-row items-center justify-between  space-x-4  w-full   ">
        <div className=" flex flex-row items-center gap-2">
          <img
            className="inline-block object-cover size-10 rounded-full ring-2 ring-blue-50 dark:ring-gray-800"
            src="/exemple/random-stock-photo.jpg"
            alt="Image Description"
          />
          <div className="flex flex-col">
            <p className="text-black font-medium">
              Your personal dashboard oreview
            </p>
            <p className="  text-muted-foreground">Welcome, Hamza</p>
          </div>
        </div>
        <div className="flex flex-row gap-1">
          <Input
            placeholder="Search for something"
            type="search"
            className=" w-fit rounded-full"
          />
          <Button variant="outline" className="rounded-full" size="icon">
            <User />
          </Button>
        </div>
      </nav>

      <div className="flex flex-row w-full py-4 gap-2 ">
        <div className="p-6  w-1/3 space-y-10 shadow-md rounded-2xl">
          <nav className="flex flex-row justify-between">
            profile
            <Settings />
          </nav>
          <div className="flex flex-col justify-center items-center">
            <img
              className="inline-block object-cover size-20 rounded-full ring-2 ring-blue-50 dark:ring-gray-800"
              src="/exemple/random-stock-photo.jpg"
              alt="Image Description"
            />
            <h1>Hamza Benarfa</h1>
            <h2>Scrum Master</h2>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div
              className=" flex flex-row items-center  gap-1
      text-white border-[1px] backdrop-blur-3xl bg-orange-600/30 py-[2px] px-3 rounded-xl"
            >
              <Users className="size-6 " />
              <p>2</p>
            </div>
            <div
              className=" flex flex-row items-center  gap-1
      text-white border-[1px] backdrop-blur-3xl bg-orange-600/30 py-[2px] px-3 rounded-xl"
            >
              <CheckCheck className="size-6 " />
              <p>2</p>
            </div>
            <div
              className=" flex flex-row items-center  gap-1
      text-white border-[1px] backdrop-blur-3xl bg-orange-600/30 py-[2px] px-3 rounded-xl"
            >
              <CalendarCheck className="size-6 " />
              <p>2</p>
            </div>
          </div>
        </div>

        <div className="flex gap-1 flex-col w-full">
          <div className="flex gap-1 flex-row w-full">
            <div className="p-4 w-full flex flex-col justify-between h-full rounded-xl bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-400">
              <nav className="flex items-center justify-between">
                <h1>Prioritized tasks</h1>
                <Button variant="ghost" size="icon" asChild>
                  <Timer />
                </Button>
              </nav>
              <div>
                <h1 className="text-5xl">83%</h1>
                <p className=" text-muted-foreground">Avg. Completed</p>
              </div>
            </div>
            <div className="p-4 w-full flex flex-col justify-between h-full rounded-xl bg-gradient-to-tr from-yellow-200 via-green-200 to-green-500">
              <nav className="flex items-center justify-between">
                <h1>Additional tasks</h1>
                <Button variant="ghost" size="icon" asChild>
                  <Check />
                </Button>
              </nav>
              <div>
                <h1 className="text-5xl">65%</h1>
                <p className=" text-muted-foreground">Avg. Completed</p>
              </div>
            </div>
          </div>
          <div className="p-4 w-full h-full flex flex-col justify-between  rounded-xl bg-gradient-to-tr from-blue-200 via-blue-300 to-blue-400">
            <nav className="flex items-center justify-between">
              <h1>Meetings</h1>
              <Button variant="ghost" size="icon" asChild>
                <CalendarCheck />
              </Button>
            </nav>
            <div className="flex flex-row items-end">
              <h1 className="text-5xl">2</h1>
              <p className=" text-muted-foreground">Scheduled</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
