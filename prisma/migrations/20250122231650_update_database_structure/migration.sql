/*
  Warnings:

  - You are about to drop the column `course_id` on the `course_schedules` table. All the data in the column will be lost.
  - You are about to drop the column `class_id` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `student_attendances` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `student_notifications` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `teacher_attendances` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user_notifications` table. All the data in the column will be lost.
  - Added the required column `class_course_id` to the `course_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Status` to the `student_attendances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Status` to the `student_notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Status` to the `teacher_attendances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Status` to the `user_notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `course_schedules` DROP FOREIGN KEY `course_schedules_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `courses_class_id_fkey`;

-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `courses_teacher_id_fkey`;

-- DropIndex
DROP INDEX `course_schedules_course_id_fkey` ON `course_schedules`;

-- DropIndex
DROP INDEX `courses_class_id_fkey` ON `courses`;

-- DropIndex
DROP INDEX `courses_teacher_id_fkey` ON `courses`;

-- AlterTable
ALTER TABLE `course_schedules` DROP COLUMN `course_id`,
    ADD COLUMN `class_course_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `courses` DROP COLUMN `class_id`,
    DROP COLUMN `teacher_id`;

-- AlterTable
ALTER TABLE `student_attendances` DROP COLUMN `status`,
    ADD COLUMN `Status` ENUM('attend', 'absent', 'justified_absence') NOT NULL;

-- AlterTable
ALTER TABLE `student_notifications` DROP COLUMN `status`,
    ADD COLUMN `Status` ENUM('seen', 'pending', 'failed') NOT NULL;

-- AlterTable
ALTER TABLE `teacher_attendances` DROP COLUMN `status`,
    ADD COLUMN `Status` ENUM('attend', 'absent', 'justified_absence') NOT NULL;

-- AlterTable
ALTER TABLE `user_notifications` DROP COLUMN `status`,
    ADD COLUMN `Status` ENUM('seen', 'pending', 'failed') NOT NULL;

-- CreateTable
CREATE TABLE `class_teachers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacher_id` INTEGER NOT NULL,
    `class_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `class_students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `class_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `class_courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `class_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `class_teachers` ADD CONSTRAINT `class_teachers_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_teachers` ADD CONSTRAINT `class_teachers_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_students` ADD CONSTRAINT `class_students_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_students` ADD CONSTRAINT `class_students_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_courses` ADD CONSTRAINT `class_courses_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_courses` ADD CONSTRAINT `class_courses_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_schedules` ADD CONSTRAINT `course_schedules_class_course_id_fkey` FOREIGN KEY (`class_course_id`) REFERENCES `class_courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
