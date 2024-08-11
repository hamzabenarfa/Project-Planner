/*
  Warnings:

  - A unique constraint covering the columns `[name,columnId]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tasks_name_columnId_key` ON `tasks`(`name`, `columnId`);
