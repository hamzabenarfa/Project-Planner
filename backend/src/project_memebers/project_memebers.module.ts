import { Module } from '@nestjs/common';
import { ProjectMemebersService } from './project_memebers.service';
import { ProjectMemebersController } from './project_memebers.controller';

@Module({
  controllers: [ProjectMemebersController],
  providers: [ProjectMemebersService],
})
export class ProjectMemebersModule {}
