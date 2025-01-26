export const PROFILE_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  phone: true,
  createdAt: true,
  updatedAt: true,
};

export const STUDENT_SELECT = {
  id: true,
  email: true,
  profile: { select: PROFILE_SELECT },
  classStudents: {
    select: {
      classe: {
        select: {
          name: true,
          slug: true,
          description: true,
        },
      },
    },
  },
};

export const CLASS_STUDENTS_SELECT = {
  id: true,
  email: true,
  profile: { select: PROFILE_SELECT },
};
