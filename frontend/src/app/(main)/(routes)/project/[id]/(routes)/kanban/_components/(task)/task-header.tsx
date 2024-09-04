import TaskCardDrawer from "./_drawer/TaskCardDrawer";
import { Task } from "@/types/task.type";

const TaskHeader = ({task}:{task:Task}) => {
  console.log("🚀 ~ TaskHeader ~ task:", task)
  return (
    <nav className=" w-full flex justify-between items-center ">
        <div className=" flex gap-1">
          <div className=" border-[1px] backdrop-blur-3xl bg-white/70 py-[2px] px-2 rounded-md">
            <p className=" font-medium text-sm text-blue-400/85">#website</p>
          </div>
          <div className=" border-[1px] backdrop-blur-3xl bg-white/70 py-[2px] px-2 rounded-md">
            <p className=" font-medium text-sm text-blue-400/85">#Client</p>
          </div>
        </div>
        <TaskCardDrawer task={task}/>
      </nav>
  );
};

export default TaskHeader;
