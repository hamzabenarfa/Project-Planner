"use client";
import { Task } from "@/types/task.type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskHeader from "./task-header";
import CheckboxList from "../checkbox-list-ticket";
import CircleProgress from "../CircleProgress";

import TaskFooter from "./task-footer";

interface Props {
  task: Task;
}

function TaskCard({ task }: Props) {
  const {
    setNodeRef, attributes, listeners, transform, transition, isDragging,
  } = useSortable({
    id: task.id || "",
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" opacity-30 bg-mainBackgroundColor p-2.5 h-[100px] min-h-[300px] items-center  flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative "
      />
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-2.5 h-[100px] min-h-[300px] flex flex-col items-start gap-4 text-left  rounded-3xl hover:ring-2 hover:ring-inse hover:ring-blue-300 cursor-grab relative bg-gradient-to-r from-cyan-200 to-blue-300`}
    >
      <TaskHeader task={task} />

      <p className="w-full whitespace-pre-wrap text-xl font-semibold text-white">
        {task.name}
      </p>

      <div className="flex flex-col gap-2">
        <CheckboxList label="Create user flow" />
        <CheckboxList label="Make wireframe" />
        <CheckboxList label="Design onboarding screens" />
      </div>

      <CircleProgress progress={40} />

      <TaskFooter />
    </div>
  );
}

export default TaskCard;
