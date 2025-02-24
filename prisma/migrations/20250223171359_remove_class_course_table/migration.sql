/*
  Warnings:

  - You are about to drop the `class_courses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `class_courses` DROP FOREIGN KEY `class_courses_class_id_fkey`;

-- DropForeignKey
ALTER TABLE `class_courses` DROP FOREIGN KEY `class_courses_course_id_fkey`;

-- DropTable
DROP TABLE `class_courses`;
