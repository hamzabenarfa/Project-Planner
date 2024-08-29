import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class KanbanService {
  constructor(private readonly databaseService: DatabaseService) {}

  async updateKanbanTotalTasks(
    kanbanId: number,
    change: 'increment' | 'decrement',
  ) {
    try {
      await this.databaseService.kanban.update({
        where: {
          id: kanbanId,
        },
        data: {
          totalTasks: {
            [change]: 1, // Uses the `change` parameter to either increment or decrement
          },
        },
      });
    } catch (error) {
      console.error(
        `Error updating totalTasks for Kanban ID ${kanbanId}:`,
        error,
      );
      throw new Error('Failed to update totalTasks');
    }
  }
}
