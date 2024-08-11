import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectKpiController } from './kpi/project-kpi.controller';
import { ProjectKpiService } from './kpi/project-kpi.service';

@Module({
  providers: [ProjectService, ProjectKpiService],
  controllers: [ProjectController, ProjectKpiController],
})
export class ProjectModule {}
