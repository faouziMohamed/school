const BASE_API = '/api/v1';
export const API_ROUTES = {
  /**
   * @param {string?} search
   * @returns {'/api/v1/students'}
   *  */
  STUDENTS: (search) => {
    if (!search?.trim()) {
      return `${BASE_API}/students`;
    }
    const sTerm = String(search).trim() || '';
    const query = new URLSearchParams({ search: sTerm });
    return `${BASE_API}/students?${query.toString()}`;
  },
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
  /**
   * @param {number} courseId
   * @returns {`/api/v1/courses/${string}`}
   */
  COURSES_BY_ID: (courseId) => `${BASE_API}/courses/${courseId}`,
  /**
   * @param {number} classId
   * @returns {`/api/v1/classes/${number}/schedules`}
   * */
  SCHEDULES_BY_CLASS: (classId) => `${BASE_API}/classes/${classId}/schedules`,
  /**
   * @param {number} classId
   * @returns {`/api/v1/classes/${number}/courses`}
   * */
  COURSES_BY_CLASS: (classId) => `${BASE_API}/classes/${classId}/courses`,
  /**
   * @param {number} classId
   * @returns {`/api/v1/classes/${number}/teachers`}
   * */
  TEACHERS_BY_CLASS: (classId) => `${BASE_API}/classes/${classId}/teachers`,
  /**
   * @param {number} classId
   * @param {number} courseId
   * @returns {`/api/v1/classes/${number}/courses/${number}`}
   * */
  ADD_COURSE_TO_CLASS: (classId, courseId) =>
    `${BASE_API}/classes/${classId}/courses/${courseId}`,
  /**
   * @param {number} teacherId
   * @returns {`/api/v1/teachers/${string}`}
   */
  TEACHERS: (teacherId) => {
    return `${BASE_API}/teachers/${teacherId}`;
  },
};
