import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { GetCurrentUserId } from 'src/common/decorators';
import { CreateProjectDto } from './dto';
import { Status } from '@prisma/client';

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

  @Get('/progress')
  getProjectsWithProgress(@GetCurrentUserId() userId: number) {
    return this.projectService.getProjectsWithProgress(userId);
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

  @Patch('/:projectId/name')
  patchProjectName(
    @GetCurrentUserId() userId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body('name') name: string,
  ) {
    return this.projectService.patchProjectName(projectId, name, userId);
  }

  @Patch('/:projectId/status')
  patchProjectStatus(
    @GetCurrentUserId() userId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body('status') status: Status,
  ) {
    return this.projectService.patchProjectStatus(projectId, status, userId);
  }
  @Get('/:projectId/status')
  getProjectCurrentStatus(
    @GetCurrentUserId() userId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.projectService.getProjectCurrentStatus(projectId, userId);
  }
  //need to use multer to upload image
  @Patch('/:projectId/icon')
  patchProjectIcon(
    @GetCurrentUserId() userId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body('icon') icon: string,
  ) {
    return this.projectService.patchProjectIcon(projectId, icon, userId);
  }
  
}
