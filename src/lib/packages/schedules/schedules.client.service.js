import httpClient from '@/config/axios.config';
import { API_ROUTES } from '@/lib/routes/server.route';

/**
 * Create a new class schedule
 * @param {CreateScheduleBody} data
 * @returns {Promise<ClassSchedule|ApiError>}
 */
export async function createClassSchedule(data) {
  try {
    const response = await httpClient().post(
      API_ROUTES.SCHEDULES_BY_CLASS(data.classId),
      data,
    );
    if (!response.data) {
      return { error: 'Failed to create class schedule', status: 400 };
    }
    return response.data;
  } catch (e) {
    return {
      error: e.response?.data?.message || 'Failed to create class schedule',
      status: e.response?.status || 500,
    };
  }
}

/**
 * Get All class schedules by class id
 * @param {number} classId
 */
export async function getAllClassSchedules(classId) {
  try {
    const response = await httpClient().get(
      API_ROUTES.SCHEDULES_BY_CLASS(classId),
    );
    return response.data.data;
  } catch (e) {
    return [];
  }
}
