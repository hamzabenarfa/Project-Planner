import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { ProjectService } from 'src/project/project.service';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [ProjectModule],
  controllers: [SeedController],
  providers: [SeedService, ProjectService],
})
export class SeedModule {}
