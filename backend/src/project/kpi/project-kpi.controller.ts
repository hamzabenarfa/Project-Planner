import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProjectKpiService } from './project-kpi.service';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller('project/kpi')
export class ProjectKpiController {
  constructor(private readonly projectKpiService: ProjectKpiService) {}

  @Get('/progress/:projectId')
  getMyProjectProgress(
    @GetCurrentUserId() userId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.projectKpiService.getMyProjectProgress(userId, projectId);
  }
}
