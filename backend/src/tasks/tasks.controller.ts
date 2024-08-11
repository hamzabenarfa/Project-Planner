import {
  Controller,
  Post,
  Body,
  Put,
  ParseIntPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Delete('/:taskId')
  deleteTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.tasksService.deleteTask(taskId);
  }

  @Put('/:taskId/:columnId')
  moveTaskToColumn(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Param('columnId', ParseIntPipe) columnId: number,
  ) {
    return this.tasksService.moveTaskToColumn(taskId, columnId);
  }
}
