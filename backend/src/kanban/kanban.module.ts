import { Module } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { KanbanController } from './kanban.controller';

@Module({
  providers: [KanbanService],
  controllers: [KanbanController],
  exports: [KanbanService],
})
export class KanbanModule {}
