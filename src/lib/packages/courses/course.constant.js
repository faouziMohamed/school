export const COURSE_SELECT = {
  id: true,
  name: true,
  description: true,
  slug: true,
  classTeacherCourses: {
    select: {
      id: true,
      classTeacher: {
        select: {
          teacherId: true,
          classId: true,
          classe: { select: { name: true, slug: true } },
        },
      },
    },
  },
};

export const CLASS_TEACHER_SELECT = {
  id: true,
  classTeacher: {
    select: {
      id: true,
      teacherId: true,
      classId: true,
    },
  },
  course: {
    select: {
      id: true,
      name: true,
      description: true,
      slug: true,
    },
  },
};
export const CLASS_COURSE_CO_SELECT = {
  id: true,
  name: true,
  description: true,
  slug: true,
  classCourses: {
    select: {
      id: true,
      classId: true,
    },
  },
};

export const COURSE_CLASS_COURSE_SELECT = {
  id: true,
  name: true,
  slug: true,
  description: true,
};

export const COURSE_SEARCH_SELECT = {
  id: true,
  name: true,
  description: true,
  slug: true,
  classTeacherCourses: {
    select: {
      id: true,
      classTeacher: {
        select: {
          teacherId: true,
          classId: true,
          classe: { select: { name: true, slug: true } },
        },
      },
    },
  },
};
