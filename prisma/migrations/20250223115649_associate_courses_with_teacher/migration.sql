-- CreateTable
CREATE TABLE `class_course_teachers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `class_course_id` INTEGER NOT NULL,
    `teacher_id` INTEGER NOT NULL,

    UNIQUE INDEX `class_course_teachers_class_course_id_teacher_id_key`(`class_course_id`, `teacher_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `class_course_teachers` ADD CONSTRAINT `class_course_teachers_class_course_id_fkey` FOREIGN KEY (`class_course_id`) REFERENCES `class_courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_course_teachers` ADD CONSTRAINT `class_course_teachers_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
