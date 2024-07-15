import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { GetCurrentUserId } from 'src/common/decorators';
import { CreateProjectDto } from './dto';
import { AtGuard } from 'src/common/guards';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(AtGuard)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  createProject(
    @Body() dto: CreateProjectDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.projectService.createProject(dto, userId);
  }

  @UseGuards(AtGuard)
  @Get('/mine')
  getMyProjects(@GetCurrentUserId() userId: number) {
    return this.projectService.getMyProjects(userId);
  }
}
