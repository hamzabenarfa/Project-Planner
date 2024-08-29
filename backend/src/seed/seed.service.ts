import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as argon from 'argon2';
import { ProjectService } from 'src/project/project.service';
import { CreateProjectDto } from 'src/project/dto';

@Injectable()
export class SeedService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly projectService: ProjectService,
  ) {}

  async seed() {
    // Check and create the user
    let user = await this.databaseService.user.findUnique({
      where: { email: 'hamza@gmail.com' },
    });

    if (!user) {
      const hashedPassword = await argon.hash('hamza@gmail.com');
      user = await this.databaseService.user.create({
        data: {
          email: 'hamza@gmail.com',
          hash: hashedPassword,
        },
      });
    }

    // Create a single project
    const dto: CreateProjectDto = {
      name: 'Project 1',
      endDate: new Date(),
      pinned: false,
      totalTasks: undefined,
      tasksCompleted: undefined,
      progress: undefined,
      createdAt: undefined,
      updatedAt: undefined
    };

    const newProject = await this.projectService.createProject(dto, user.id);

    // Generate burn down snapshots for the created project
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds

    // Create sample burn down snapshots
    for (let i = 0; i < 7; i++) {
      const date = new Date(now.getTime() - i * oneDay);
      const taskCounts = {
        TODO: Math.floor(Math.random() * 10),
        INPROGRESS: Math.floor(Math.random() * 10),
        InReview: Math.floor(Math.random() * 10),
        DONE: Math.floor(Math.random() * 10),
      };

      await this.databaseService.burnDownSnapshot.create({
        data: {
          projectId: newProject.id,
          date: date,
          todoCount: taskCounts.TODO,
          inProgressCount: taskCounts.INPROGRESS,
          inReviewCount: taskCounts.InReview,
          doneCount: taskCounts.DONE,
        },
      });
    }
  }
}
