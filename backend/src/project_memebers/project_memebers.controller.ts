import {
  Controller,
  Post,
  Param,
  ParseIntPipe,
  Get,
  Delete,
} from '@nestjs/common';
import { ProjectMemebersService } from './project_memebers.service';

@Controller('project-memebers')
export class ProjectMemebersController {
  constructor(
    private readonly projectMemebersService: ProjectMemebersService,
  ) {}

  @Post('add-member/:userId/project/:projectId')
  addMemberToProject(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.projectMemebersService.addMemberToProject(userId, projectId);
  }

  @Get('/:projectId/members')
  getProjectMembers(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.projectMemebersService.getProjectMembers(projectId);
  }

  @Delete('remove-member/:projectMemberId')
  removeMember(
    @Param('projectMemberId', ParseIntPipe) projectMemberId: number,
  ) {
    return this.projectMemebersService.removeMember(projectMemberId);
  }
}
