/*
  Warnings:

  - You are about to drop the column `progress` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `tasksCompleted` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `totalTasks` on the `projects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,ownerId]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `kanbans` ADD COLUMN `progress` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `tasksCompleted` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `totalTasks` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `projects` DROP COLUMN `progress`,
    DROP COLUMN `tasksCompleted`,
    DROP COLUMN `totalTasks`;

-- CreateIndex
CREATE UNIQUE INDEX `projects_name_ownerId_key` ON `projects`(`name`, `ownerId`);
