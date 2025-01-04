import { PROFILE_SELECT, USER_SELECT } from "../teachers/teacher.constant";

export const COURSE_SELECT = {
  id: true,
  name: true,
  description: true,
  teacher: {
    select: {
      ...USER_SELECT,
      profile: { select: { ...PROFILE_SELECT, role: false } },
    },
  },
  classe: true,
};
