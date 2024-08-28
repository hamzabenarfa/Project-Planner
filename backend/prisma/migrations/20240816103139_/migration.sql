/*
  Warnings:

  - You are about to drop the column `done` on the `columns` table. All the data in the column will be lost.
  - Added the required column `columnType` to the `columns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `columns` DROP COLUMN `done`,
    ADD COLUMN `columnType` ENUM('TODO', 'INPROGRESS', 'InReview', 'DONE') NOT NULL;
