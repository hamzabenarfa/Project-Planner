import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProjectDto } from './dto';

@Injectable()
export class ProjectService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createProject(dto: CreateProjectDto, userId: number) {
    const newProject = await this.databaseService.project.create({
      data: {
        ...dto,
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
