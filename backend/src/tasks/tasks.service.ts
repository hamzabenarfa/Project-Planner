import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { DatabaseService } from 'src/database/database.service';
import { KanbanService } from 'src/kanban/kanban.service';
import { ColumnType } from '@prisma/client';

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
  async addTask(projectId: number, createTaskDto: CreateTaskDto) {
    const todoColumn = await this.databaseService.column.findFirst({
      where: { kanbanId: projectId, columnType: 'TODO' },
    });

    const taskCreated = await this.databaseService.task.create({
      data: {
        ...createTaskDto,
        columnId: todoColumn.id,
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
    const task = await this.databaseService.task.findFirst({
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
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    const kanbanId = task.column.kanbanId;

    await this.databaseService.task.delete({
      where: { id: taskId },
    });

    await this.kanbanService.updateKanbanTotalTasks(kanbanId, 'decrement');

    return { message: 'Task deleted successfully' };
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

    return movedTask;
  }

  public async getTasksByColumnTypes(
    kanbanId: number,
    columnTypes: ColumnType,
  ) {
    const selectedColumn = await this.databaseService.column.findFirst({
      where: {
        kanbanId,
        columnType: columnTypes,
      },
    });
    const tasks = await this.databaseService.task.findMany({
      where: {
        columnId: selectedColumn.id,
      },
    });

    return tasks;
  }
  public async countTotalTasksByColumnTypes(
    kanbanId: number,
    columnTypes: ColumnType,
  ) {
    const columnExists = await this.databaseService.column.findFirst({
      where: {
        kanbanId,
        columnType: columnTypes,
      },
    });
    if (!columnExists) {
      return 0;
    }
    const selectedColumn = await this.databaseService.column.findFirst({
      where: {
        kanbanId,
        columnType: columnTypes,
      },
    });
    const count = await this.databaseService.task.count({
      where: {
        columnId: selectedColumn.id,
      },
    });

    return count;
  }

  async getProjectTotalTasks(kanbanId: number) {
    const kanban = await this.databaseService.kanban.findFirst({
      where: { id: kanbanId },
    });
    if (!kanban) {
      throw new HttpException('kanban not found', HttpStatus.NOT_FOUND);
    }
    return kanban.totalTasks;
  }
}
