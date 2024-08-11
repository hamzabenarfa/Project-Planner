import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { DatabaseService } from 'src/database/database.service';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createColumnDto: CreateColumnDto) {
    const kanban = await this.findKanbanByProjectId(createColumnDto.projectId);
    const columnCreated = await this.databaseService.column.create({
      data: {
        name: createColumnDto.name,
        kanbanId: kanban.id,
        done: createColumnDto.name.toLowerCase() === 'done' ? true : false,
      },
    });
    return columnCreated;
  }

  async getEachColumn(columnId: number) {
    const colums = await this.databaseService.column.findMany({
      where: {
        id: columnId,
      },
      include: {
        tasks: true,
      },
    });
    return colums;
  }
  async getAllColumns(projectId: number) {
    const kanban = await this.findKanbanByProjectId(projectId);

    const columns = await this.databaseService.column.findMany({
      where: {
        kanbanId: kanban.id,
      },
      include: {
        tasks: true,
      },
    });
    return columns;
  }
  private async findKanbanByProjectId(projectId: number) {
    const kanban = await this.databaseService.kanban.findFirst({
      where: {
        projectId: projectId,
      },
    });
    return kanban;
  }
  async delete(columnId: number) {
    await this.databaseService.task.deleteMany({
      where: {
        columnId: columnId,
      },
    });

    await this.databaseService.column.delete({
      where: {
        id: columnId,
      },
    });
  }
  async updateColumnName(columnId: number, dto: UpdateColumnDto) {
    const column = await this.databaseService.column.update({
      where: {
        id: columnId,
      },
      data: {
        name: dto.name,
        done: dto.name.toLowerCase() === 'done' ? true : false,
      },
    });
    return column;
  }
}
