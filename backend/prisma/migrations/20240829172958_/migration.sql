/*
  Warnings:

  - You are about to drop the column `progress` on the `kanbans` table. All the data in the column will be lost.
  - You are about to drop the column `totalTasksCompleted` on the `kanbans` table. All the data in the column will be lost.
  - You are about to drop the column `completed` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `kanbans` DROP COLUMN `progress`,
    DROP COLUMN `totalTasksCompleted`;

-- AlterTable
ALTER TABLE `projects` ADD COLUMN `endDate` DATETIME(3) NULL,
    MODIFY `status` ENUM('BUILDING', 'STARTED', 'PENDING', 'STOPPED', 'INPROGRESS') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `tasks` DROP COLUMN `completed`,
    ADD COLUMN `description` LONGTEXT NULL;

-- CreateTable
CREATE TABLE `burn_down_snapshots` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `todoCount` INTEGER NOT NULL,
    `inProgressCount` INTEGER NOT NULL,
    `inReviewCount` INTEGER NOT NULL,
    `doneCount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `burn_down_snapshots` ADD CONSTRAINT `burn_down_snapshots_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
