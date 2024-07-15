import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
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

  @Post('add-existing-member/:memberId')
  addExistingMember(
    @Param('memberId', ParseIntPipe) memberId: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.teamMembersService.addExistingMember(memberId, userId);
  }

  @Get('my-team')
  getMyTeam(@GetCurrentUserId() userId: number) {
    return this.teamMembersService.getMyTeam(userId);
  }

  @Get('my-team-formated')
  getMyTeamFormated(@GetCurrentUserId() userId: number) {
    return this.teamMembersService.getMyTeamFormated(userId);
  }
}
