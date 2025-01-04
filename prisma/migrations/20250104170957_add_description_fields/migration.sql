-- AlterTable
ALTER TABLE `classes` ADD COLUMN `description` TEXT NULL;

-- AlterTable
ALTER TABLE `course_schedules` ADD COLUMN `note` VARCHAR(191) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `courses` ADD COLUMN `description` TEXT NULL;

-- AlterTable
ALTER TABLE `student_profiles` ADD COLUMN `avatar_url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user_profiles` ADD COLUMN `avatar_url` VARCHAR(191) NULL;
