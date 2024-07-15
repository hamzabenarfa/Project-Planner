import { Module } from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { TeamMembersController } from './team-members.controller';
import { UserService } from 'src/user/user.service';
import { TeamService } from 'src/team/team.service';

@Module({
  controllers: [TeamMembersController],
  providers: [TeamMembersService, UserService, TeamService],
})
export class TeamMembersModule {}
