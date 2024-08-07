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

    await this.databaseService.kanban.create({
      data: {
        projectId: newProject.id,
      },
    });
    return newProject;
  }

  async getMyProjects(userId: number) {
    return await this.databaseService.project.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  async deleteProject(projectId: number, userId: number) {
    const project = await this.databaseService.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    await this.deleteRelatedRecords(projectId);

    await this.databaseService.project.delete({
      where: {
        id: projectId,
      },
    });

    return { message: 'Project deleted successfully' };
  }
  private async deleteRelatedRecords(projectId: number) {
    await this.databaseService.projectMember.deleteMany({
      where: {
        projectId: projectId,
      },
    });

    const kanban = await this.databaseService.kanban.findFirst({
      where: {
        projectId: projectId,
      },
      include: {
        columns: {
          include: {
            tasks: true,
          },
        },
      },
    });

    if (kanban) {
      for (const column of kanban.columns) {
        await this.databaseService.task.deleteMany({
          where: {
            columnId: column.id,
          },
        });

        await this.databaseService.column.delete({
          where: {
            id: column.id,
          },
        });
      }

      await this.databaseService.kanban.delete({
        where: {
          id: kanban.id,
        },
      });
    }
  }
}
