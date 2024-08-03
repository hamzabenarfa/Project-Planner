import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(dto: CreateTeamDto, userId: number) {
    const teamExists = await this.getMyTeam(userId);
    if (teamExists) {
      throw new ConflictException('You can have one team right now');
    }
    return await this.prisma.team.create({
      data: {
        ...dto,
        ownerId: userId,
      },
    });
  }

  async getMyTeam(userId: number) {
    return await this.prisma.team.findFirst({
      where: {
        ownerId: userId,
      },
    });
  }
  async getMyTeamId(userId: number): Promise<number> {
    const team = await this.prisma.team.findFirst({
      where: {
        ownerId: userId,
      },
    });
    return team.id;
  }
}
