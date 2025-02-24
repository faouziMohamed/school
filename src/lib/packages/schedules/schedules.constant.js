import { CLASS_CLASS_COURSE_SELECT } from '@/lib/packages/classes/classe.constant';
import { COURSE_CLASS_COURSE_SELECT } from '@/lib/packages/courses/course.constant';

export const SCHEDULE_CLASS_COURSE_INCLUDE = {
  course: { select: COURSE_CLASS_COURSE_SELECT },
  classTeacher: {
    select: {
      teacher: {
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              avatarUrl: true,
              firstName: true,
              lastName: true,
              phone: true,
            },
          },
        },
      },
      classe: {
        select: CLASS_CLASS_COURSE_SELECT,
      },
    },
  },
};
