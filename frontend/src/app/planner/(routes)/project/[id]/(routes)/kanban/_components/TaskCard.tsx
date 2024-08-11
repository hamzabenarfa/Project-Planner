"use client";
import { Id, Task } from "@/types/kanban.type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCardDrawer from "./TaskCardDrawer";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {

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

  

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-mainBackgroundColor shadow-sm p-2.5 h-[100px] min-h-[100px] items-start 
                   flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 
                   cursor-grab relative task"
    >
      <p className="select-none	 w-full whitespace-pre-wrap text-black ">
        {task.name}
      </p>
      <TaskCardDrawer /> 
    </div>
  );
}

export default TaskCard;
