/*
  Warnings:

  - You are about to drop the column `completed` on the `columns` table. All the data in the column will be lost.
  - You are about to drop the column `tasksCompleted` on the `kanbans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `columns` DROP COLUMN `completed`,
    ADD COLUMN `done` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `kanbans` DROP COLUMN `tasksCompleted`,
    ADD COLUMN `totalTasksCompleted` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false;
