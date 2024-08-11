import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnService.create(createColumnDto);
  }
  @Get(':columnId')
  getEachColumn(@Param('columnId', ParseIntPipe) columnId: number) {
    return this.columnService.getEachColumn(columnId);
  }

  @Get('all/:columnId')
  getAllColumns(@Param('columnId', ParseIntPipe) columnId: number) {
    return this.columnService.getAllColumns(columnId);
  }
  @Put(':columnId')
  updateColumnName(
    @Param('columnId', ParseIntPipe) columnId: number,
    @Body() dto: UpdateColumnDto,
  ) {
    return this.columnService.updateColumnName(columnId, dto);
  }

  @Delete(':columnId')
  deleteColumn(@Param('columnId', ParseIntPipe) columnId: number) {
    return this.columnService.delete(columnId);
  }
}
