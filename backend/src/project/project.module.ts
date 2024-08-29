import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectKpiService } from './kpi/project-kpi.service';
import { TasksService } from 'src/tasks/tasks.service';
import { KanbanModule } from 'src/kanban/kanban.module';

@Module({
  imports: [KanbanModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectKpiService, TasksService],
  exports: [ProjectKpiService],
})
export class ProjectModule {}
