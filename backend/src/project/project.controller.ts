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

  @Get('/mine')
  getMyProjects(@GetCurrentUserId() userId: number) {
    return this.projectService.getMyProjects(userId);
  }

  @Delete('/:projectId')
  deleteProject(
    @GetCurrentUserId() userId: number,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.projectService.deleteProject(projectId, userId);
  }
}
