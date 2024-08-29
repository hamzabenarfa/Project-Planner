import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ListFilter } from "lucide-react";
import { CreateTaskModal } from "./(task)/create-task-modal";
import { Id } from "@/types/kanban.type";
import { Id } from "react-beautiful-dnd";
import { useCreateTask } from "@/hooks/useTask";
import { create } from "axios";

interface KanbanNavbarProps {
  projectId: Id;
}

const KanbanNavbar = ({ projectId }: KanbanNavbarProps) => {
  const data = [
    {
      src: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      alt: "Image Description",
    },
    {
      src: "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      alt: "Image Description",
    },

    {
      src: "/exemple/other-random-dude.jpg",
      alt: "Image Description",
    },
    {
      src: "/exemple/random-stock-photo.jpg",
      alt: "Image Description",
    },
  ];
  const currentDate = format(new Date(), "EEEE, MMMM do yyyy");
  const currentMonth = format(new Date(), "MMMM");
  return (
    <nav className=" flex flex-col gap-2 md:flex-row items-center justify-between border-[2px]  space-x-4  w-full rounded-3xl p-4 ">
      <div className="flex items-center flex-row gap-2">
        <div>
          <h1 className=" font-bold text-xl">{currentMonth}</h1>
          <p>Today is {currentDate}</p>
        </div>
        {/* <Separator className=" h-12 w-[1.5px] " orientation="vertical" /> */}
        {/* <div className="flex flex-row gap-1 items-center">
          <h1 className=" font-bold text-xl">Board -</h1> 
          <span>Daily Tasks</span> <ChevronDown />
        </div> */}
      </div>
      <div className="flex items-center flex-row gap-2">
        <div className="hidden md:flex -space-x-4">
          {data.map((item, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              className="inline-block object-cover size-8 rounded-full ring-2 ring-blue-50 dark:ring-gray-800"
              src={item.src}
              alt={item.alt}
            />
          ))}
        </div>
        <Separator
          className="hidden md:block h-12 w-[1.5px] "
          orientation="vertical"
        />

        <Button variant="outline" className="hidden md:flex gap-2">
          <ListFilter />
          Filters
        </Button>
        <CreateTaskModal projectId={projectId} />
      </div>
    </nav>
  );
};

export default KanbanNavbar;
