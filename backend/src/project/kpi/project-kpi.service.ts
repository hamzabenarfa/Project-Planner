import { Injectable } from '@nestjs/common';
import { ColumnType } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class ProjectKpiService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly tasksService: TasksService,
  ) {}

  async getMyProjectProgress(projectId: number) {
    const completedTasks = await this.tasksService.countTotalTasksByColumnTypes(
      projectId,
      ColumnType.InReview,
    );

    const totalTasks = await this.tasksService.getProjectTotalTasks(projectId);

    return {
      completedTasks,
      totalTasks,
      progress: Math.floor((completedTasks / totalTasks) * 100) || 0,
    };
  }

  async taskStatusCount(projectId: number) {
    const [todo, inProgress, inReview, done] = await Promise.all([
      this.tasksService.countTotalTasksByColumnTypes(
        projectId,
        ColumnType.TODO,
      ),
      this.tasksService.countTotalTasksByColumnTypes(
        projectId,
        ColumnType.INPROGRESS,
      ),
      this.tasksService.countTotalTasksByColumnTypes(
        projectId,
        ColumnType.InReview,
      ),
      this.tasksService.countTotalTasksByColumnTypes(
        projectId,
        ColumnType.DONE,
      ),
    ]);

    return {
      todo,
      inProgress,
      inReview,
      done,
    };
  }
}
