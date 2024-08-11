import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProjectKpiService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getMyProjectProgress(userId: number, projectId: number) {
    const project = await this.databaseService.project.findFirst({
      where: { id: projectId, ownerId: userId },
    });
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }

    return project;
  }
}
