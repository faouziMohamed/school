/*
  Warnings:

  - You are about to drop the column `class_course_teacher_id` on the `class_schedules` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[class_teacher_course_id,day,start_time,end_time]` on the table `class_schedules` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class_teacher_course_id` to the `class_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `class_schedules` DROP FOREIGN KEY `class_schedules_class_course_teacher_id_fkey`;

-- DropIndex
DROP INDEX `class_schedules_class_course_teacher_id_day_start_time_end_t_key` ON `class_schedules`;

-- AlterTable
ALTER TABLE `class_schedules` DROP COLUMN `class_course_teacher_id`,
    ADD COLUMN `class_teacher_course_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `class_schedules_class_teacher_course_id_day_start_time_end_t_key` ON `class_schedules`(`class_teacher_course_id`, `day`, `start_time`, `end_time`);

-- AddForeignKey
ALTER TABLE `class_schedules` ADD CONSTRAINT `class_schedules_class_teacher_course_id_fkey` FOREIGN KEY (`class_teacher_course_id`) REFERENCES `class_teacher_courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
