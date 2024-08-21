"use client";
import { Id, Task } from "@/types/kanban.type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskNav from "./task-nav";
import CheckboxList from "./checkbox-list-ticket";
import CircleProgress from "./CircleProgress";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { set } from "date-fns";
import TaskFooter from "./task-footer";

interface Colors {
  primary: string;
  secondary: string;
}
interface Props {
  task: Task;
  bgColor: Colors;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, bgColor, deleteTask, updateTask }: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
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
        className="
        opacity-30
      bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center 
        flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
      "
      />
    );
  }
  console.log(bgColor);

  const gradientFrom = bgColor.primary ? `from-${bgColor.primary}-200` : 'from-gray-200';
  const gradientTo = bgColor.secondary ? `to-${bgColor.secondary}-300` : 'to-gray-300';
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-2.5 h-[100px] min-h-[300px] flex flex-col items-start gap-4 text-left rounded-3xl hover:ring-2 hover:ring-inset hover:ring-blue-300 cursor-grab relative bg-gradient-to-r ${gradientFrom} ${gradientTo}`}

    >
        <TaskNav />

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
