import { toaster } from '@/components/ui/toaster';
import { useCoursesByClassIdQuery } from '@/lib/packages/courses/courses.queries';
import { useCreateClassScheduleMutation } from '@/lib/packages/schedules/schedule.queries';
import { createListCollection } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

/**
 * @type {CreateScheduleInput}
 * */
const defaultValues = {
  courseId: 0,
  day: 'monday',
  startTime: '',
  endTime: '',
  note: '',
};

/**
 * @param {FrontUserClass} klass
 */
export function useClassSchedule(klass) {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [startTime, setStartTime] = useState('07:00');
  const [finishTime, setFinishTime] = useState('07:00');
  const { data, isLoading } = useCoursesByClassIdQuery({ classId: klass.id });
  const [selectedCourse, setSelectedCourse] = useState([]);
  const createMutation = useCreateClassScheduleMutation({ classId: klass.id });
  const courseCollection = useMemo(
    /**
     * @returns {import('@chakra-ui/react').ListCollection<FrontCourse>}
     */
    () => {
      return createListCollection({
        items: data || [],
        itemToString: (item) => item.name,
        itemToValue: (item) => item.id,
      });
    },
    [data],
  );
  /**
   * @type {import('react-hook-form').UseFormReturn<CreateScheduleInput>}
   */
  const form = useForm({
    defaultValues,
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
  });
  const { handleSubmit, watch } = form;
  const onSubmit = handleSubmit(async (formData) => {
    /** @type {SingularFrontCourse} */
    const course = data.find((c) => Number(c.id) === Number(formData.courseId));
    /** @type {CreateScheduleBody} */
    const body = {
      ...formData,
      classId: Number(klass.id),
      courseId: Number(formData.courseId),
      classTeacherId: Number(course.correlation.classTeacherId),
    };
    const saved = await createMutation.mutateAsync(body);
    if (!saved) {
      toaster.error({ title: 'Error creating schedule' });
      return;
    }
    if ('status' in saved) {
      toaster.error({ title: saved.error || 'Error creating schedule' });
      return;
    }
    form.reset();
    setSelectedCourse([]);
    toaster.success({ title: 'Schedule created successfully' });
  });

  return {
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    finishTime,
    setFinishTime,
    data,
    isLoadingCourses: isLoading,
    selectedCourse,
    setSelectedCourse,
    courseCollection,
    onSubmit,
    createMutation,
    watch,
    form,
  };
}
