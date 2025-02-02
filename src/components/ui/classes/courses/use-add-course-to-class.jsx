import { toaster } from '@/components/ui/toaster';
import { submitAddCourseToClass } from '@/lib/packages/classes/actions/courses.action';
import { API_ROUTES } from '@/lib/routes/server.route';
import { useRef, useState } from 'react';

let controller = new AbortController();

/**
 * @param {() => void} onClose
 * @param {Classe} klass
 */
export function useAddCourseToClass(onClose, klass) {
  /**
   * @type {[Course[], (courses: Course[]) => void]}
   */
  const state = useState([]);
  const [courses, setCourses] = state;
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [fetchingCourses, setFetchingCourses] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
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
       * @type {{data: Course[]}}
       */
      const data = await response.json();
      if (data.data.length === 0) {
        setCourses([]);
        setOpen(false);
        return;
      }
      setCourses(data.data.sort((a, b) => a.classes.length - b.classes.length));
      setOpen(true);
    } catch (e) {
      console.error(e);
      setFetchingCourses(false);
    }
  };

  const onAddCourseToClass = async () => {
    setSubmitting(true);
    const response = await submitAddCourseToClass({
      classId: klass.id,
      courseId: selectedCourse.id,
      classSlug: klass.slug,
    });
    setSubmitting(false);
    if (response.success) {
      toaster.success({
        title: `Course added to the class successfully`,
      });
      onClose?.();
    } else if (response.error) {
      toaster.error({
        title: `Failed to add the course to the class`,
        description: response.error,
        type: 'error',
      });
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
