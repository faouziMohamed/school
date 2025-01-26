/*
  Warnings:

  - A unique constraint covering the columns `[student_id,class_id]` on the table `class_students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacher_id,class_id]` on the table `class_teachers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `class_students_student_id_class_id_key` ON `class_students`(`student_id`, `class_id`);

-- CreateIndex
CREATE UNIQUE INDEX `class_teachers_teacher_id_class_id_key` ON `class_teachers`(`teacher_id`, `class_id`);
