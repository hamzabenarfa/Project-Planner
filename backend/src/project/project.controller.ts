import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { GetCurrentUserId } from 'src/common/decorators';
import { CreateProjectDto } from './dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  createProject(
    @Body() dto: CreateProjectDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.projectService.createProject(dto, userId);
  }

  @Get('/mine/all')
  getMyProjects(@GetCurrentUserId() userId: number) {
    return this.projectService.getMyProjects(userId);
  }
  @Get('/mine/pinned')
  getMyPinnedProjects(@GetCurrentUserId() userId: number) {
    return this.projectService.getMyPinnedProjects(userId);
  }
  @Get('/mine/unpinned')
  getMyUnpinnedProjects(@GetCurrentUserId() userId: number) {
    return this.projectService.getMyUnpinnedProjects(userId);
  }

  @Put('/pin/:projectId')
  togglePinProject(
    @GetCurrentUserId() userId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.projectService.togglePinProject(projectId, userId);
  }

  @Delete('/:projectId')
  deleteProject(
    @GetCurrentUserId() userId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.projectService.deleteProject(projectId, userId);
  }
}
