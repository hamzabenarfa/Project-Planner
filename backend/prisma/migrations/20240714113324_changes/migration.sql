/*
  Warnings:

  - You are about to drop the column `projectId` on the `team_members` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `team_members` DROP FOREIGN KEY `team_members_projectId_fkey`;

-- AlterTable
ALTER TABLE `team_members` DROP COLUMN `projectId`;
