import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnService.create(createColumnDto);
  }
  @Get('/:columnId')
  getEachColumn(@Param('columnId', ParseIntPipe) columnId: number) {
    return this.columnService.getEachColumn(columnId);
  }
}
