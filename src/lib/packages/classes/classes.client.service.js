import httpClient from '@/config/axios.config';
import { API_ROUTES } from '@/lib/routes/server.route';

/**
 * @param {number} classId
 * @returns {Promise<FrontTeacher[]>}
 */
export async function getClassTeachersByClassId(classId) {
  try {
    const res = await httpClient().get(API_ROUTES.TEACHERS_BY_CLASS(classId));
    return res.data.data;
  } catch (e) {
    return [];
  }
}

/**
 * @param {number} classId
 * @returns {Promise<FrontCourse[]>}
 */
export async function getCoursesByClassId(classId) {
  try {
    const res = await httpClient().get(API_ROUTES.COURSES_BY_CLASS(classId));
    return res.data.data;
  } catch (e) {
    return [];
  }
}
