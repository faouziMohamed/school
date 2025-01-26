export const PROFILE_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  phone: true,
  createdAt: true,
  updatedAt: true,
  role: true,
};
export const USER_SELECT = {
  id: true,
  email: true,
  profile: { select: PROFILE_SELECT },
  classTeachers: {
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

export const CLASS_TEACHERS_SELECT = {
  id: true,
  email: true,
  profile: { select: PROFILE_SELECT },
};
