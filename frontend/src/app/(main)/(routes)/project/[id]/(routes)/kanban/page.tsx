"use client";

import { useEffect, useMemo, useState } from "react";
import { Id } from "@/types/kanban.type";
import { Task } from "@/types/task.type";
import { Column } from "@/types/column.type";
import ColumnContainer from "./_components/ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./_components/(task)/TaskCard";
import api from "@/lib/axios-instance";
import { useParams } from "next/navigation";
import KanbanNavbar from "./_components/kanban-navbar";
import { useGetAllMyColumn } from "@/hooks/useColumn";

function KanbanBoard() {
  const projectId = useParams();
  const  { columnData, isLoading, status, error } = useGetAllMyColumn(projectId.id[0]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);


  useEffect(() => {
    if (columnData) {
      setColumns(columnData?.data);
      const allTasks = columnData?.data.map((column) => column.tasks || []).flat();
      setTasks(allTasks);
    }
  }, [columnData]);

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
    <div className=" flex flex-col gap-4 min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px] p-10 ">
      <KanbanNavbar projectId={projectId.id[0]} />

      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className=" flex-col md:flex-row items-start flex gap-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  createTask={createTask}
                  tasks={
                    tasks && tasks.filter((task) => task.columnId === col.id)
                  }
                />
              ))}
            </SortableContext>
          </div>
        </div>

        {portalContainer &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  createTask={createTask}
                  tasks={
                    tasks &&
                    tasks.filter((task) => task.columnId === activeColumn.id)
                  }
                />
              )}
              {activeTask && <TaskCard task={activeTask} />}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );

  async function createTask(columnId: Id) {
    try {
      const response = await api<Task>({
        url: "/tasks",
        method: "POST",
        data: { name: `Task ${tasks.length + 1}`, columnId },
      });
      const data = response.data;
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

  async function onDragOver(event: DragOverEvent) {
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

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId;
        moveTaskToColumn(activeId, overId);
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  async function moveTaskToColumn(
    taskId: UniqueIdentifier,
    columnId: UniqueIdentifier
  ) {
    try {
      const response = await api({
        url: `/tasks/${taskId}/${columnId}`,
        method: "PUT",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

export default KanbanBoard;
