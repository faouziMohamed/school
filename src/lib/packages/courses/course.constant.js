export const COURSE_SELECT = {
  id: true,
  name: true,
  description: true,
  slug: true,
  classCourses: {
    select: {
      id: true,
      classId: true,
      classe: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  },
};

export const CLASS_COURSE_SELECT = {
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

export const COURSE_SEARCH_SELECT = {
  id: true,
  name: true,
  description: true,
  slug: true,
  classCourses: {
    select: {
      id: true,
      classId: true,
      classe: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  },
};
