import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProjectMemebersService {
  constructor(private readonly prisma: DatabaseService) {}
  async addMemberToProject(userId: number, projectId: number) {
    const memberAlreadyAssigned = await this.prisma.projectMember.findFirst({
      where: {
        userId: userId,
        projectId: projectId,
      },
    });
    if (memberAlreadyAssigned) {
      throw new HttpException(
        'User already assigned to project',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.prisma.projectMember.create({
      data: {
        projectId: projectId,
        userId: userId,
      },
    });
    return {
      message: 'User assigned to project',
    };
  }

  async getProjectMembers(projectId: number) {
    return this.prisma.projectMember.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        user: {
          select: {
            email: true,
            role: true,
            id: true,
          },
        },
      },
    });
  }
  async removeMember(projectMemberId: number) {
    const member = await this.prisma.projectMember.findFirst({
      where: {
        id: projectMemberId,
      },
    });
    console.log(member)
    if (!member) {
      throw new HttpException(
        'User not assigned to project',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.prisma.projectMember.delete({
      where: {
        id: projectMemberId,
      },
    });
    return {
      message: 'User unassigned from project',
    };
  }
}
