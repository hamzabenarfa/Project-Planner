import { Controller, Post, Body } from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller('team-members')
export class TeamMembersController {
  constructor(private readonly teamMembersService: TeamMembersService) {}

  @Post('create-new-member')
  createNewMember(
    @Body() dto: CreateTeamMemberDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.teamMembersService.create(dto, userId);
  }

  @Post('add-existing-member')
  addExistingMember(
    @Body() memberId: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.teamMembersService.addExistingMember(memberId, userId);
  }
}
