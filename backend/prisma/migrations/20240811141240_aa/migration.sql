-- DropIndex
DROP INDEX `projects_name_ownerId_key` ON `projects`;

-- AlterTable
ALTER TABLE `columns` ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false;
