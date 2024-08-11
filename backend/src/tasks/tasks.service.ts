import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

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
    await this.updateKanbanTotalTasks(kanbanId, 'increment');

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

      await this.updateKanbanTotalTasks(kanbanId, 'decrement');

      return { message: 'Task deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete task');
    }
  }

  async moveTaskToColumn(taskId: number, columnId: number) {
    const task = await this.databaseService.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      throw new Error('Task not found');
    }
    return this.databaseService.task.update({
      where: { id: task.id },
      data: {
        columnId: columnId,
      },
    });
  }
  private async updateKanbanTotalTasks(
    kanbanId: number,
    change: 'increment' | 'decrement',
  ) {
    try {
      await this.databaseService.kanban.update({
        where: {
          id: kanbanId,
        },
        data: {
          totalTasks: {
            [change]: 1, // Uses the `change` parameter to either increment or decrement
          },
        },
      });
    } catch (error) {
      console.error(
        `Error updating totalTasks for Kanban ID ${kanbanId}:`,
        error,
      );
      throw new Error('Failed to update totalTasks');
    }
  }
}
