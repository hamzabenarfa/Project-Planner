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
    });
    return taskCreated;
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
}
