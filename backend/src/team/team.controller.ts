import { Controller, Get, Post, Body } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(
    @Body() createTeamDto: CreateTeamDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.teamService.create(createTeamDto, userId);
  }

  @Get('/mine')
  getMyTeam(@GetCurrentUserId() userId: number) {
    console.log(userId)
    return this.teamService.getMyTeam(userId);
  }
}
