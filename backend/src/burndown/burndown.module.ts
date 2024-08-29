import { Module } from '@nestjs/common';
import { BurndownService } from './burndown.service';
import { BurndownController } from './burndown.controller';
import { DatabaseService } from 'src/database/database.service';
import { ProjectService } from 'src/project/project.service';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [ProjectModule],
  providers: [BurndownService, DatabaseService, ProjectService],
  controllers: [BurndownController],
})
export class BurndownModule {}
