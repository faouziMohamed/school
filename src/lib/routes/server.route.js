const BASE_API = '/api/v1';
export const API_ROUTES = {
  CLASS_ROOMS_SLUG: (slug) => `${BASE_API}/class-rooms/${slug}`,
  /** @param {string?} search */
  STUDENTS: (search) => {
    if (!search?.trim()) {
      return `${BASE_API}/students`;
    }
    const sTerm = String(search).trim() || '';
    const query = new URLSearchParams({ search: sTerm });
    return `${BASE_API}/students?${query.toString()}`;
  },
  /** @param {number} studentId */
  STUDENTS_ID: (studentId) => `${BASE_API}/students/${studentId}`,
  USERS: (search) => {
    if (!search?.trim()) {
      return `${BASE_API}/users`;
    }
    const sTerm = String(search).trim() || '';
    const query = new URLSearchParams({ search: sTerm });
    return `${BASE_API}/users?${query.toString()}`;
  },
  COURSES: (search) => {
    if (!search?.trim()) {
      return `${BASE_API}/courses`;
    }
    const sTerm = String(search).trim() || '';
    const query = new URLSearchParams({ search: sTerm });
    return `${BASE_API}/courses?${query.toString()}`;
  },
};
