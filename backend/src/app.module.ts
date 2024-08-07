import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { TeamMembersModule } from './team-members/team-members.module';
import { ProjectMemebersModule } from './project_memebers/project_memebers.module';
import { KanbanModule } from './kanban/kanban.module';
import { ColumnModule } from './column/column.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ProjectModule,
    UserModule,
    TeamModule,
    TeamMembersModule,
    ProjectMemebersModule,
    KanbanModule,
    ColumnModule,
    TasksModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
