/*
  Warnings:

  - You are about to drop the `course_schedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `course_schedules` DROP FOREIGN KEY `course_schedules_class_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `student_attendances` DROP FOREIGN KEY `student_attendances_schedule_id_fkey`;

-- DropForeignKey
ALTER TABLE `teacher_attendances` DROP FOREIGN KEY `teacher_attendances_schedule_id_fkey`;

-- DropIndex
DROP INDEX `student_attendances_schedule_id_fkey` ON `student_attendances`;

-- DropIndex
DROP INDEX `teacher_attendances_schedule_id_fkey` ON `teacher_attendances`;

-- DropTable
DROP TABLE `course_schedules`;

-- CreateTable
CREATE TABLE `class_course_schedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `class_course_id` INTEGER NOT NULL,
    `day` ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL,
    `start_time` VARCHAR(191) NOT NULL,
    `end_time` VARCHAR(191) NOT NULL,
    `note` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `class_course_schedules` ADD CONSTRAINT `class_course_schedules_class_course_id_fkey` FOREIGN KEY (`class_course_id`) REFERENCES `class_courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher_attendances` ADD CONSTRAINT `teacher_attendances_schedule_id_fkey` FOREIGN KEY (`schedule_id`) REFERENCES `class_course_schedules`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_attendances` ADD CONSTRAINT `student_attendances_schedule_id_fkey` FOREIGN KEY (`schedule_id`) REFERENCES `class_course_schedules`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
