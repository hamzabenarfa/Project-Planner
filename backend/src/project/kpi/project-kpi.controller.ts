import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProjectKpiService } from './project-kpi.service';

@Controller('project/kpi')
export class ProjectKpiController {
  constructor(private readonly projectKpiService: ProjectKpiService) {}

  @Get('/progress/:projectId')
  getMyProjectProgress(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.projectKpiService.getMyProjectProgress(projectId);
  }
}
