import { COURSE_SELECT } from '../courses/course.constant';

export const CLASSE_SELECT = {
  id: true,
  name: true,
  description: true,
  courses: {
    select: COURSE_SELECT,
  },
};
