/*
  Warnings:

  - You are about to drop the `class_course_teachers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `class_course_teachers` DROP FOREIGN KEY `class_course_teachers_class_id_fkey`;

-- DropForeignKey
ALTER TABLE `class_course_teachers` DROP FOREIGN KEY `class_course_teachers_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `class_course_teachers` DROP FOREIGN KEY `class_course_teachers_teacher_id_fkey`;

-- DropForeignKey
ALTER TABLE `class_schedules` DROP FOREIGN KEY `class_schedules_class_course_teacher_id_fkey`;

-- DropTable
DROP TABLE `class_course_teachers`;

-- CreateTable
CREATE TABLE `class_teacher_courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `class_teacher_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,

    UNIQUE INDEX `class_teacher_courses_class_teacher_id_course_id_key`(`class_teacher_id`, `course_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `class_teacher_courses` ADD CONSTRAINT `class_teacher_courses_class_teacher_id_fkey` FOREIGN KEY (`class_teacher_id`) REFERENCES `class_teachers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_teacher_courses` ADD CONSTRAINT `class_teacher_courses_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_schedules` ADD CONSTRAINT `class_schedules_class_course_teacher_id_fkey` FOREIGN KEY (`class_course_teacher_id`) REFERENCES `class_teacher_courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
