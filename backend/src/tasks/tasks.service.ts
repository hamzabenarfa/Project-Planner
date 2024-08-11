import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { DatabaseService } from 'src/database/database.service';
import { KanbanService } from 'src/kanban/kanban.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly kanbanService: KanbanService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const taskCreated = await this.databaseService.task.create({
      data: {
        ...createTaskDto,
        columnId: createTaskDto.columnId,
      },
      include: {
        column: {
          select: {
            kanbanId: true,
          },
        },
      },
    });

    const kanbanId = taskCreated.column.kanbanId;
    this.kanbanService.updateKanbanTotalTasks(kanbanId, 'increment');

    return taskCreated;
  }
  async deleteTask(taskId: number) {
    try {
      const task = await this.databaseService.task.findUnique({
        where: { id: taskId },
        include: {
          column: {
            select: {
              kanbanId: true,
            },
          },
        },
      });
      if (!task) {
        throw new Error('Task not found');
      }
      const kanbanId = task.column.kanbanId;

      await this.databaseService.task.delete({
        where: { id: taskId },
      });

      await this.kanbanService.updateKanbanTotalTasks(kanbanId, 'decrement');

      return { message: 'Task deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete task');
    }
  }

  async moveTaskToColumn(taskId: number, columnId: number) {
    const task = await this.databaseService.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    const taskInColumn = await this.databaseService.task.findFirst({
      where: { columnId, id: taskId },
    });

    if (taskInColumn) {
      if (taskInColumn.columnId === columnId && taskInColumn.id === taskId) {
        throw new HttpException(
          'Task already in column',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const movedTask = await this.databaseService.task.update({
      where: { id: taskId },
      data: { columnId },
      include: {
        column: {
          select: {
            done: true,
            kanbanId: true,
          },
        },
      },
    });

    const completedStatus = movedTask.column.done;
    const kanbanId = movedTask.column.kanbanId;
    await this.updateTaskCompletionStatus(kanbanId, taskId, completedStatus);

    return movedTask;
  }

  private async updateTaskCompletionStatus(
    kanbanId: number,
    taskId: number,
    completed: boolean,
  ) {
    try {
      await this.databaseService.task.update({
        where: { id: taskId },
        data: { completed },
      });
      completed
        ? this.kanbanService.updateKanbanTotalTasksCompleted(
            kanbanId,
            'increment',
          )
        : this.kanbanService.updateKanbanTotalTasksCompleted(
            kanbanId,
            'decrement',
          );
    } catch (error) {
      throw new HttpException('Failed to update task completion status', 500);
    }
  }
}
