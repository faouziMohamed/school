import { getCoursesByClassId } from '@/lib/packages/classes/classes.client.service';
import {
  addExistingCourseToClass,
  createNewCourseAndAssignItToTeacher,
  fetchCoursesByClassId,
} from '@/lib/packages/courses/courses.client.service';
import { API_ROUTES } from '@/lib/routes/server.route';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
 * @param {Object} options
 * @param {number} options.classId
 * @returns {import('@tanstack/react-query').UseQueryResult<FrontCourse[]>}
 */
export function useCoursesByClassIdQuery(options = {}) {
  const { data = [], ...rest } = useQuery({
    queryKey: [API_ROUTES.COURSES_BY_CLASS(options.classId)],
    queryFn: () => fetchCoursesByClassId(options.classId),
  });
  return { data, ...rest };
}

/**
 * @param {Object} options
 * @param {number} options.classId
 * @param {import('@tanstack/react-query').MutationOptions<T=CreateScheduleInput, Error, R=Course>['mutationFn']} options.mutationFn
 * @returns {import('@tanstack/react-query').UseMutationResult<FrontCourse>}
 */
function useCourseMutation({ mutationFn, classId }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [API_ROUTES.COURSES_BY_CLASS(classId)],
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
 * @returns {import('@tanstack/react-query').UseMutationResult<FrontCourse|ApiError>}
 */
export function useCreateCourseMutation({ classId }) {
  return useCourseMutation({
    mutationFn: createNewCourseAndAssignItToTeacher,
    classId,
  });
}

/**
 * @param {Object} options
 * @param {number} options.classId
 * @returns {import('@tanstack/react-query').UseMutationResult<FrontCourse|ApiError>}
 */
export function useCreateCourseByIdsMutation({ classId }) {
  return useCourseMutation({
    mutationFn: addExistingCourseToClass,
    classId,
  });
}

/**
 * @param {Object} options
 * @param {number} options.classId
 * @returns {import('@tanstack/react-query').UseQueryResult<FrontCourse[]>}
 */
export function useCourseByClassIdQuery(options = {}) {
  const { data = [], ...rest } = useQuery({
    queryKey: [API_ROUTES.COURSES_BY_CLASS(options.classId)],
    queryFn: () => getCoursesByClassId(options.classId),
    refetchOnWindowFocus: 'always',
    refetchOnReconnect: 'always',
  });
  return { data, ...rest };
}
