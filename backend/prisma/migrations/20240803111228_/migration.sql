/*
  Warnings:

  - A unique constraint covering the columns `[name,ownerId]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `projects_name_ownerId_key` ON `projects`(`name`, `ownerId`);
