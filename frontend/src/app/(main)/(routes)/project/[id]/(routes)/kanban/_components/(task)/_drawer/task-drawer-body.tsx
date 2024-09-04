import { Task } from "@/types/task.type";
import MainContent from "./main-content";
import { Settings } from "lucide-react";

const TaskDrawerBody = ({ task }: { task: Task }) => {
  return <section className="flex flex-row gap-6  py-8">
    <MainContent />
    <div className="w-96">
        <nav className="flex flex-row  justify-between">
             <p>assign </p>
             <Settings />
        </nav>
    </div>
  </section>;
};

export default TaskDrawerBody;
