import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProjectKpiService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getMyProjectProgress(userId: number, projectId: number) {
    const project = await this.databaseService.project.findFirst({
      where: { id: projectId, ownerId: userId },
      include: {
        kanban: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    const result = await this.getProjectTotalTasks(project.kanban.id);

    if (result.totalTasks === 0) {
      return result;
    } else {
      return {
        ...result,
        progress: Math.floor((result.completedTasks / result.totalTasks) * 100),
      };
    }
  }

  private async getProjectTotalTasks(kanbanId: number) {
    const kanban = await this.databaseService.kanban.findFirst({
      where: { id: kanbanId },
    });
    if (!kanban) {
      throw new HttpException('kanban not found', HttpStatus.NOT_FOUND);
    }
    return {
      totalTasks: kanban.totalTasks,
      completedTasks: kanban.totalTasksCompleted,
    };
  }
}
