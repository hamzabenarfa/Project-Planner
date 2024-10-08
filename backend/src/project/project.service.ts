import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProjectDto } from './dto';
import { ProjectKpiService } from './kpi/project-kpi.service';
import { Status } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly projectKpiService: ProjectKpiService,
  ) {}

  async getBurnDownChart(projectId: number) {
    const project = await this.getProjectById(projectId);
    const taskStatusCount =
      await this.projectKpiService.taskStatusCount(projectId);
    return {
      dateStart: project.createdAt,
      dateEnd: project.endDate,
      ...taskStatusCount,
    };
  }

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
        ownerId: userId,
      },
    });

    const kanban = await this.databaseService.kanban.create({
      data: {
        projectId: newProject.id,
      },
    });

    await this.databaseService.column.createMany({
      data: [
        { name: 'Todo', columnType: 'TODO', kanbanId: kanban.id },
        { name: 'in progress', columnType: 'INPROGRESS', kanbanId: kanban.id },
        { name: 'in review', columnType: 'InReview', kanbanId: kanban.id },
        { name: 'done', columnType: 'DONE', kanbanId: kanban.id },
      ],
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
  async getProjectsWithProgress(userId: number) {
    const projects = await this.getMyProjects(userId);

    const projectsWithProgress = await Promise.all(
      projects.map(async (project) => {
        const progress = await this.projectKpiService.getMyProjectProgress(
          project.id,
        );
        return {
          ...project,
          ...progress,
        };
      }),
    );

    return projectsWithProgress;
  }

  async getMyPinnedProjects(userId: number) {
    return await this.databaseService.project.findMany({
      where: {
        ownerId: userId,
        pinned: true,
      },
    });
  }
  async getMyUnpinnedProjects(userId: number) {
    return await this.databaseService.project.findMany({
      where: {
        ownerId: userId,
        pinned: false,
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
  async togglePinProject(projectId: number, userId: number) {
    const project = await this.databaseService.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    return await this.databaseService.project.update({
      where: {
        id: projectId,
      },
      data: {
        pinned: !project.pinned,
      },
    });
  }

  async patchProjectName(projectId: number, name: string, userId: number) {
    const project = await this.databaseService.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    return await this.databaseService.project.update({
      where: {
        id: projectId,
      },
      data: {
        name: name,
      },
    });
  }

  async patchProjectStatus(projectId: number, status: Status, userId: number) {
    const project = await this.databaseService.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    if (project.status === status) {
      throw new HttpException(
        'Project status is already ' + status,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.databaseService.project.update({
      where: {
        id: projectId,
      },
      data: {
        status: status,
      },
    });
  }
  async getProjectCurrentStatus(projectId: number, userId: number) {
    const project = await this.databaseService.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    return project.status;
  }

  async patchProjectIcon(projectId: number, icon: string, userId: number) {
    const project = await this.databaseService.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    return;
    // return await this.databaseService.project.update({
    //   where: {
    //     id: projectId,
    //   },
    //   data: {
    //     icon: icon,
    //   },
    // });
  }

  private async getProjectById(projectId: number) {
    const project = await this.databaseService.project.findFirst({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    return project;
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
