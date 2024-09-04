import { Button } from "@/components/ui/button";
import { SheetTitle } from "@/components/ui/sheet";
import { Task } from "@/types/task.type";
import { EditIcon, Trash2 } from "lucide-react";

const TaskDrawerNavbar = ({ task } :{task:Task}) => {
  return (
    <nav className="  py-6 justify-between flex flex-row items-center ">
      <SheetTitle className="capitalize text-5xl ">{task.name} #{task.id}</SheetTitle>
      <div className="flex flex-row items-center gap-2">
        <Button variant="secondary">
          <EditIcon className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2 />
        </Button>
      </div>
    </nav>
  );
};

export default TaskDrawerNavbar;
