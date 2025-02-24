/*
  Warnings:

  - A unique constraint covering the columns `[class_course_id,day,start_time,end_time]` on the table `class_course_schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `class_course_schedules_class_course_id_day_start_time_end_ti_key` ON `class_course_schedules`(`class_course_id`, `day`, `start_time`, `end_time`);
