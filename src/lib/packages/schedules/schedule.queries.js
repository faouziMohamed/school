import {
  createClassSchedule,
  getAllClassSchedules,
} from '@/lib/packages/schedules/schedules.client.service';
import { API_ROUTES } from '@/lib/routes/server.route';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
 * @param {Object} options
 * @param {number} options.classId
 * @returns {import('@tanstack/react-query').UseQueryResult<ClassSchedule>}
 */
export function useClassScheduleQuery(options = {}) {
  return useQuery({
    queryKey: [API_ROUTES.SCHEDULES_BY_CLASS(options.classId)],
    queryFn: () => {
      if (!options.classId) return [];
      return getAllClassSchedules(options.classId);
    },
  });
}

/**
 * @param {Object} options
 * @param {number} options.classId
 * @param {import('@tanstack/react-query').MutationOptions<T=CreateScheduleInput, Error, R=ClassSchedule>['mutationFn']} options.mutationFn
 * @returns {import('@tanstack/react-query').UseMutationResult<ClassSchedule>}
 */
function useClassScheduleMutation({ mutationFn, classId }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [API_ROUTES.SCHEDULES_BY_CLASS(classId)],
      });
    },
    onError: (error) => {
      console.debug('Beneficiary mutation failed', { error });
    },
  });
}

/**
 * @param {Object} options
 * @param {number} options.classId
 * @returns {import('@tanstack/react-query').UseMutationResult<ClassSchedule|ApiError>}
 */
export function useCreateClassScheduleMutation({ classId }) {
  return useClassScheduleMutation({
    mutationFn: createClassSchedule,
    classId,
  });
}
