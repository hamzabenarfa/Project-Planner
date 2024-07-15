import { Injectable } from '@nestjs/common';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class TeamMembersService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly userService: UserService,
    private readonly teamService: TeamService,
  ) {}
  async create(dto: CreateTeamMemberDto, userId: number) {
    const userCreated = await this.userService.createUser({
      email: dto.email,
      password: dto.password,
    });
    const MyTeamId = await this.teamService.getMyTeamId(userId);
    return this.prisma.teamMember.create({
      data: {
        teamId: MyTeamId,
        userId: userCreated.id,
      },
    });
  }

  async addExistingMember(memberId: number, userId: number) {
    const MyTeamId = await this.teamService.getMyTeamId(userId);
    return this.prisma.teamMember.create({
      data: {
        teamId: MyTeamId,
        userId: memberId,
      },
    });
  }

  async getMyTeam(userId: number) {
    const MyTeamId = await this.teamService.getMyTeamId(userId);
    return this.prisma.teamMember.findMany({
      where: {
        teamId: MyTeamId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async getMyTeamFormated(userId: number) {
    const MyTeamId = await this.teamService.getMyTeamId(userId);
    const teamMembers = await this.prisma.teamMember.findMany({
      where: {
        teamId: MyTeamId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
    return teamMembers.map((member) => ({
      id: member.user.id,
      email: member.user.email,
      role: member.user.role,
    }));
  }
}
