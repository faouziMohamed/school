import httpClient from '@/config/axios.config';
import { API_ROUTES } from '@/lib/routes/server.route';

/**
 * @param {number} classId
 */
export async function fetchCoursesByClassId(classId) {
  try {
    const res = await httpClient().get(API_ROUTES.COURSES_BY_CLASS(classId));
    return res.data.data;
  } catch (e) {
    return [];
  }
}

/**
 * Create a new course
 * @param {Object} data
 * @param {number} data.classId
 * @param {number} data.courseId
 * @param {number} data.classTeacherId
 * @returns {Promise<FrontCourse|ApiError>}
 */
export async function addExistingCourseToClass(data) {
  try {
    const url = API_ROUTES.ADD_COURSE_TO_CLASS(data.classId, data.courseId);
    const response = await httpClient().post(url, data);
    if (!response.data) {
      return { error: 'Failed to create course', status: 400 };
    }
    return response.data;
  } catch (e) {
    return {
      error: e.response?.data?.message || 'Failed to create course',
      status: e.response?.status || 500,
    };
  }
}

/**
 * Create a new course
 * @param {CreateNewCourseBody} data
 * @returns {Promise<FrontCourse|ApiError>}
 */
export async function createNewCourseAndAssignItToTeacher(data) {
  try {
    const url = API_ROUTES.COURSES_BY_CLASS(data.classId);
    const response = await httpClient().post(url, data);
    if (!response.data) {
      return { error: 'Failed to create course', status: 400 };
    }
    return response.data;
  } catch (e) {
    return {
      error: e.response?.data?.message || 'Failed to create course',
      status: e.response?.status || 500,
    };
  }
}
