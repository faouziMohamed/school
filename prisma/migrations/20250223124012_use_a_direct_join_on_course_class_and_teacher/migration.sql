/*
  Warnings:

  - You are about to drop the column `class_course_id` on the `class_course_schedules` table. All the data in the column will be lost.
  - You are about to drop the column `class_course_id` on the `class_course_teachers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[class_course_teacher_id,day,start_time,end_time]` on the table `class_course_schedules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[class_id,course_id,teacher_id]` on the table `class_course_teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class_course_teacher_id` to the `class_course_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_id` to the `class_course_teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `class_course_teachers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `class_course_schedules` DROP FOREIGN KEY `class_course_schedules_class_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `class_course_teachers` DROP FOREIGN KEY `class_course_teachers_class_course_id_fkey`;

-- DropIndex
DROP INDEX `class_course_schedules_class_course_id_day_start_time_end_ti_key` ON `class_course_schedules`;

-- DropIndex
DROP INDEX `class_course_teachers_class_course_id_teacher_id_key` ON `class_course_teachers`;

-- AlterTable
ALTER TABLE `class_course_schedules` DROP COLUMN `class_course_id`,
    ADD COLUMN `class_course_teacher_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `class_course_teachers` DROP COLUMN `class_course_id`,
    ADD COLUMN `class_id` INTEGER NOT NULL,
    ADD COLUMN `course_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `class_course_schedules_class_course_teacher_id_day_start_tim_key` ON `class_course_schedules`(`class_course_teacher_id`, `day`, `start_time`, `end_time`);

-- CreateIndex
CREATE UNIQUE INDEX `class_course_teachers_class_id_course_id_teacher_id_key` ON `class_course_teachers`(`class_id`, `course_id`, `teacher_id`);

-- AddForeignKey
ALTER TABLE `class_course_teachers` ADD CONSTRAINT `class_course_teachers_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_course_teachers` ADD CONSTRAINT `class_course_teachers_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_course_schedules` ADD CONSTRAINT `class_course_schedules_class_course_teacher_id_fkey` FOREIGN KEY (`class_course_teacher_id`) REFERENCES `class_course_teachers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
