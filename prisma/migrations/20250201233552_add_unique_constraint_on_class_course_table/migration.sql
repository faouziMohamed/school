/*
  Warnings:

  - A unique constraint covering the columns `[course_id,class_id]` on the table `class_courses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `class_courses_course_id_class_id_key` ON `class_courses`(`course_id`, `class_id`);
