import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BurndownService } from './burndown.service';

@Controller('burndown')
export class BurndownController {
  constructor(private readonly burnDownService: BurndownService) {}
  @Get(':projectId')
  async getBurnDownData(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.burnDownService.getBurnDownData(projectId);
  }
}
