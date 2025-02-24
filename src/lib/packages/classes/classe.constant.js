export const CLASSE_SELECT = {
  id: true,
  name: true,
  description: true,
  slug: true,
  classTeachers: {
    select: {
      classTeacherCourses: {
        select: {
          courseId: true,
          classTeacherId: true,
        },
      },
      _count: {
        select: {
          classTeacherCourses: true,
        },
      },
    },
  },
  _count: {
    select: {
      classTeachers: true,
      classStudents: true,
    },
  },
};

export const CLASS_CLASS_COURSE_SELECT = {
  id: true,
  name: true,
  slug: true,
  description: true,
};
