import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ColumnService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createColumnDto: CreateColumnDto) {
    const columnCreated = await this.databaseService.column.create({
      data: {
        name: createColumnDto.name,
        kanbanId: createColumnDto.kanbanId,
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
}
