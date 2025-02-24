import { getClassTeachersByClassId } from '@/lib/packages/classes/classes.client.service';
import { API_ROUTES } from '@/lib/routes/server.route';
import { useQuery } from '@tanstack/react-query';

/**
 * @param {Object} options
 * @param {number} options.classId
 * @returns {import('@tanstack/react-query').UseQueryResult<FrontTeacher[]>}
 */
export function useTeachersByClassIdQuery(options = {}) {
  const { data = [], ...rest } = useQuery({
    queryKey: [API_ROUTES.TEACHERS_BY_CLASS(options.classId)],
    queryFn: () => getClassTeachersByClassId(options.classId),
    refetchOnWindowFocus: 'always',
    refetchOnReconnect: 'always',
  });
  return { data, ...rest };
}
