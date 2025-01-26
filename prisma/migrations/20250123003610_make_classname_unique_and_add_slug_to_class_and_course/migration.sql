/*
  Warnings:

  - You are about to drop the column `Status` on the `student_attendances` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `student_notifications` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `teacher_attendances` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `user_notifications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `classes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `classes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `student_attendances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `student_notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `teacher_attendances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `user_notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `classes`
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;
-- slug is a unique field and for now it value is same as name lowercase + id
UPDATE `classes` c
SET `slug` = CONCAT(LOWER(c.`name`), '_', c.`id`);

-- AlterTable
ALTER TABLE `courses`
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;
-- slug is a unique field and for noe it value is same as name lowercase + id
UPDATE `courses` c
SET `slug` = CONCAT(LOWER(c.`name`), '_', c.`id`);

-- AlterTable
ALTER TABLE `student_attendances`
    DROP COLUMN `Status`,
    ADD COLUMN `status` ENUM ('attend', 'absent', 'justified_absence') NOT NULL;

-- AlterTable
ALTER TABLE `student_notifications`
    DROP COLUMN `Status`,
    ADD COLUMN `status` ENUM ('seen', 'pending', 'failed') NOT NULL;

-- AlterTable
ALTER TABLE `teacher_attendances`
    DROP COLUMN `Status`,
    ADD COLUMN `status` ENUM ('attend', 'absent', 'justified_absence') NOT NULL;

-- AlterTable
ALTER TABLE `user_notifications`
    DROP COLUMN `Status`,
    ADD COLUMN `status` ENUM ('seen', 'pending', 'failed') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `classes_name_key` ON `classes` (`name`);

-- CreateIndex
CREATE UNIQUE INDEX `classes_slug_key` ON `classes` (`slug`);

-- CreateIndex
CREATE INDEX `classes_name_slug_idx` ON `classes` (`name`, `slug`);

-- CreateIndex
CREATE UNIQUE INDEX `courses_slug_key` ON `courses` (`slug`);

-- CreateIndex
CREATE INDEX `courses_slug_idx` ON `courses` (`slug`);
