import { API_ROUTES } from '@/lib/routes/server.route';

export function coursesToFrontCourses(courses) {
  return courses.map(courseToFrontCourse);
}

/**
 * @param course
 * @returns {{id, name, description, slug, url: `/api/v1/courses/${string}`, correlation: *}}
 */
export function courseToFrontCourse(course) {
  return {
    id: course.id,
    name: course.name,
    description: course.description,
    slug: course.slug,
    url: API_ROUTES.COURSES_BY_ID(course.id),
    correlation: course.classTeacherCourses.map((ctc) => ({
      correlationId: ctc.id,
      teacherId: ctc.classTeacher.teacherId,
      teacherUrl: API_ROUTES.TEACHERS(ctc.classTeacher.teacherId),
      classId: ctc.classTeacher.classId,
      classSlug: ctc.classTeacher.classe.slug,
      className: ctc.classTeacher.classe.name,
    })),
  };
}
