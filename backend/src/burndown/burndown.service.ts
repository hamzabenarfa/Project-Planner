import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { DatabaseService } from 'src/database/database.service';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class BurndownService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly projectService: ProjectService,
  ) {}

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  // async handleCron() {
  //   const projects = await this.databaseService.project.findMany();
  //   for (const project of projects) {
  //     const taskCounts = await this.projectService.getBurnDownChart(project.id);
  //     await this.databaseService.burnDownSnapshot.create({
  //       data: {
  //         projectId: project.id,
  //         date: new Date(),
  //         todoCount: taskCounts.todo,
  //         inProgressCount: taskCounts.inProgress,
  //         inReviewCount: taskCounts.inReview,
  //         doneCount: taskCounts.done,
  //       },
  //     });
  //   }
  // }

  async getBurnDownData(projectId: number) {
    return this.databaseService.burnDownSnapshot.findMany({
      where: { projectId },
      orderBy: { date: 'asc' },
    });
  }
}
