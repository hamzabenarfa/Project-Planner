-- AlterTable
ALTER TABLE `projects` ADD COLUMN `progress` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `status` ENUM('BUILDING', 'STARTED', 'PENDING', 'INPROGRESS') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `tasksCompleted` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `totalTasks` INTEGER NOT NULL DEFAULT 0;
