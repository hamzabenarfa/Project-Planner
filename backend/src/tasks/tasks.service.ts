import { Injectable } from '@nestjs/common';
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
    try {
      const task = await this.databaseService.task.findUnique({
        where: { id: taskId },
      });

      if (!task) {
        throw new Error('Task not found');
      }

      const movedTask = await this.databaseService.task.update({
        where: { id: task.id },
        data: { columnId },
        include: {
          column: {
            select: {
              done: true,
            },
          },
        },
      });

      const completedStatus = movedTask.column.done;
      await this.updateTaskCompletionStatus(taskId, completedStatus);

      return movedTask;
    } catch (error) {
      console.error('Error moving task to column:', error);
      throw new Error('Failed to move task to column');
    }
  }

  private async updateTaskCompletionStatus(taskId: number, completed: boolean) {
    try {
      await this.databaseService.task.update({
        where: { id: taskId },
        data: { completed },
      });
    } catch (error) {
      console.error('Error updating task completion status:', error);
      throw new Error('Failed to update task completion status');
    }
  }
}
