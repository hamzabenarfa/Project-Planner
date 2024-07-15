import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProjectMemebersService {
  constructor(private readonly prisma: DatabaseService) {}
  async addMemberToProject(userId: number, projectId: number) {
    return this.prisma.projectMember.create({
      data: {
        projectId: projectId,
        userId: userId,
      },
    });
  }

  async getProjectMembers(projectId: number) {
    return this.prisma.projectMember.findMany({
      where: {
        projectId: projectId,
      },
    });
  }
}
