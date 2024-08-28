import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProjectKpiService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getMyProjectProgress(projectId: number) {
    const doneColumn = await this.databaseService.column.findFirst({
      where: {
        kanbanId: projectId,
        columnType: 'DONE',
      },
    });
    const completedTasks = await this.databaseService.task.count({
      where: {
        columnId: doneColumn.id,
      },
    });

    const totalTasks = await this.getProjectTotalTasks(projectId);

    return {
      completedTasks,
      totalTasks,
      progress: Math.floor((completedTasks / totalTasks) * 100) || 0,
    };
  }

  private async getProjectTotalTasks(kanbanId: number) {
    const kanban = await this.databaseService.kanban.findFirst({
      where: { id: kanbanId },
    });
    if (!kanban) {
      throw new HttpException('kanban not found', HttpStatus.NOT_FOUND);
    }
    return kanban.totalTasks;
  }
}
