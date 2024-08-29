"use client";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "@/types/kanban.type";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./(task)/TaskCard";
import { EllipsisVertical, Plus, PlusCircle, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Props {
  column: Column;
  createTask: (columnId: Id) => void;
  tasks: Task[];
}

function ColumnContainer({ column, createTask, tasks }: Props) {
  const tasksIds = useMemo(() => {
    return tasks && tasks.map((task) => task.id || "");
  }, [tasks]);

  const { setNodeRef, transform, transition } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
      border-2 md:w-[300px]  h-[600px] max-h-[70vh] rounded-3xl flex flex-col "
    >
      {/* Column title */}
      <div className="text-md h-[60px] p-4 font-bold flex items-center justify-between">
        <div className="flex gap-2">
          <div className="flex justify-center items-centerbg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            {tasks ? tasks.length : "0"}
          </div>
          {column.name}
        </div>
        <div className="flex flex-row-reverse">
          <button
            onClick={() => {
              return;
            }}
            className="stroke-gray-50 hover:stroke-whit hover:bg-columnBackgroundColor rounded px-1 py-2 "
          >
            <EllipsisVertical />
          </button>
          <button
            onClick={() => {
              createTask(column.id);
            }}
            className=" stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2 "
          >
            <Plus />
          </button>
        </div>
      </div>

      <Separator className="" />

      {/* Column task container */}
      <div className="flex flex-grow flex-col  gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks && tasks.map((task) => <TaskCard key={task.id} task={task} />)}
        </SortableContext>
      </div>
    </div>
  );
}

export default ColumnContainer;
