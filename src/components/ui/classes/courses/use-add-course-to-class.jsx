import { toaster } from '@/components/ui/toaster';
import { useCreateCourseByIdsMutation } from '@/lib/packages/courses/courses.queries';
import { API_ROUTES } from '@/lib/routes/server.route';
import { useRef, useState } from 'react';

let controller = new AbortController();

/**
 * @param {() => void} onClose
 * @param {Classe} klass
 * @param {FrontTeacher} teacher
 */
export function useAddCourseToClass(onClose, klass, teacher) {
  /**
   * @type {[FrontCourse[], (courses: FrontCourse[]) => void]}
   */
  const state = useState([]);
  const [courses, setCourses] = state;
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [fetchingCourses, setFetchingCourses] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const courseMutation = useCreateCourseByIdsMutation({ classId: klass.id });
  const handleSearch = async (search) => {
    if (controller) {
      controller.abort();
    }
    if (!search) {
      setOpen(false);
      setCourses([]);
      return;
    }
    controller = new AbortController();
    try {
      const searchUrl = API_ROUTES.COURSES(search);
      setFetchingCourses(true);
      const response = await fetch(searchUrl, { signal: controller.signal });
      setFetchingCourses(false);
      if (!response.ok) {
        setCourses([]);
        setOpen(false);
        return;
      }
      /**
       * @type {{data: FrontCourse[]}}
       */
      const data = await response.json();
      if (data.data.length === 0) {
        setCourses([]);
        setOpen(false);
        return;
      }
      setCourses(
        data.data.sort((a, b) => a.classes?.length - b.classes?.length),
      );
      setOpen(true);
    } catch (e) {
      console.error(e);
      setFetchingCourses(false);
    }
  };

  const onAddCourseToClass = async () => {
    setSubmitting(true);
    const response = await courseMutation.mutateAsync({
      classId: klass.id,
      courseId: selectedCourse.id,
      classTeacherId: teacher.classTeacherId,
    });
    setSubmitting(false);
    if ('status' in response) {
      toaster.error({
        title: response.error || 'Failed to add the course to the class',
        description: `Failed to add the course to the class`,
        type: 'error',
      });
    } else {
      toaster.success({
        title: `Course added to the class successfully`,
      });
      onClose?.();
    }
  };

  return {
    courses,
    selectedCourse,
    setSelectedCourse,
    submitting,
    setSubmitting,
    open,
    setOpen,
    ref,
    handleSearch,
    onAddCourseToClass,
    fetchingCourses,
  };
}
