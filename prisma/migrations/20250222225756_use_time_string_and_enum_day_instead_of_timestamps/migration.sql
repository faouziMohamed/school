/*
  Warnings:

  - You are about to drop the column `endAt` on the `course_schedules` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `course_schedules` table. All the data in the column will be lost.
  - Added the required column `day` to the `course_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `course_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `course_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course_schedules` DROP COLUMN `endAt`,
    DROP COLUMN `startAt`,
    ADD COLUMN `day` ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL,
    ADD COLUMN `end_time` VARCHAR(191) NOT NULL,
    ADD COLUMN `start_time` VARCHAR(191) NOT NULL;
