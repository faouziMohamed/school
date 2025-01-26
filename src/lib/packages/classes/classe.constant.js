export const CLASSE_SELECT = {
  id: true,
  name: true,
  description: true,
  slug: true,
  _count: {
    select: {
      classTeacher: true,
      classCourse: true,
      classStudent: true,
    },
  },
};
