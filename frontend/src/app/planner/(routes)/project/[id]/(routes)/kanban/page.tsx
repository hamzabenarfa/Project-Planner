"use client";

import { PlusCircle, Trash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Column, Id, Task } from "@/types/kanban.type";
import ColumnContainer from "./_components/ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./_components/TaskCard";
import axiosInstance from "@/lib/axios-instance";
import { useParams } from "next/navigation";
function KanbanBoard() {
  const projectId = useParams();
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  useEffect(() => {
    getColumns();
  }, [projectId.id]);

  async function getColumns() {
    try {
      const response = await axiosInstance({
        url: `/column/all/${projectId.id}`,
        method: "GET",
      });
      setColumns(response.data);
      const allTasks = response.data.flatMap((column) => column.tasks);
      setTasks(allTasks);
    } catch (error) {
      console.error(error);
    }
  }

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );
  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  return (
    <div
      className="
        m-auto
        flex flex-col p-2 
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
    "
    >
      {/* <nav className=" bg-red-50 w-full h-40">kan</nav> */}
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex-col md:flex-row items-start flex gap-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={
                    tasks && tasks.filter((task) => task.columnId === col.id)
                  }
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColumn();
            }}
            className="
                h-[60px]
                w-[350px]
                min-w-[350px]
                cursor-pointer
                rounded-lg
                bg-mainBackgroundColor
                border-2
                border-columnBackgroundColor
                p-4
                ring-rose-500
                hover:ring-2
                flex
                gap-2 
                "
          >
            <PlusCircle />
            Add Column
          </button>
        </div>

        {portalContainer &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={
                    tasks &&
                    tasks.filter((task) => task.columnId === activeColumn.id)
                  }
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );

  async function createTask(columnId: Id) {
    try {
      const response = await axiosInstance({
        url: "/tasks", 
        method: "POST", 
        data: {name: `Task ${tasks.length + 1}`,columnId}
      });
      const newTask: Task = {
        id: response.data.id,
        columnId,
        name: response.data.name,
      };
  
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error(error);
      
    }
   
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  async function createNewColumn() {
    try {
      const response = await axiosInstance({
        url: "/column",
        method: "POST",
        data: {
          projectId: parseInt(projectId.id),
          name: `Column ${columns.length + 1}`,
        },
      });
      const columnToAdd: Column = {
        id: response.data.id,
        name: response.data.name,
      };

      setColumns([...columns, columnToAdd]);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteColumn(id: Id) {
    try {
      await axiosInstance({ url: `/column/${id}`, method: "DELETE" });
      const filteredColumns = columns.filter((col) => col.id !== id);
      setColumns(filteredColumns);

      const newTasks = tasks.filter((t) => t.columnId !== id);
      setTasks(newTasks);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateColumn(id: Id, name: string) {
    try {
      await axiosInstance({
        url: `/column/${id}`,
        method: "PUT",
        data: { name: name },
      });

      const newColumns = columns.map((col) => {
        if (col.id !== id) return col;
        return { ...col, name };
      });

      setColumns(newColumns);
    } catch (error) {
      console.log("🚀 ~ updateColumn ~ error:", error);
    }
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}



export default KanbanBoard;
