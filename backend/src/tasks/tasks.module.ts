import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { KanbanService } from 'src/kanban/kanban.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, KanbanService],
})
export class TasksModule {}
