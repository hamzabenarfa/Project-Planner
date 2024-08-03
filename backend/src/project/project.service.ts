import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProjectDto } from './dto';

@Injectable()
export class ProjectService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createProject(dto: CreateProjectDto, userId: number) {
    const projectExist = await this.databaseService.project.findFirst({
      where: {
        name: dto.name,
        ownerId: userId,
      },
    });
    if (projectExist) {
      throw new HttpException('Project already exists', HttpStatus.CONFLICT);
    }
    const newProject = await this.databaseService.project.create({
      data: {
        ...dto,
        progress: (dto.tasksCompleted / dto.totalTasks) * 100,
        ownerId: userId,
      },
    });
    return newProject;
  }

  getMyProjects(userId: number) {
    return this.databaseService.project.findMany({
      where: {
        ownerId: userId,
      },
    });
  }
}
