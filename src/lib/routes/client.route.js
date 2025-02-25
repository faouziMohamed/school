export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CLASS_ROOMS: '/class-rooms',
  /** @param {string} slug */
  CLASS_ROOMS_SLUG: (slug) => `/class-rooms/${slug}`,
  COURSE_CATALOG: '/course-catalog',
  SCHEDULES: '/schedules',
  ATTENDANCES: '/attendances',
  MY_COURSES: '/my-courses',
  MY_CLASSES: '/my-classes',
  USERS: '/users',
  SETTINGS: '/settings',
};
