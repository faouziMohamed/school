import { CreateNewCourseButton } from '@/components/ui/classes/courses/create-new-course-button';
import { EmptyState } from '@/components/ui/empty-state';
import { Field, Input, UiField } from '@/components/ui/field';
import { useClassSchedule } from '@/components/ui/schedule/use-class-schedule';
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { SchoolDaysRadio } from '@/components/ui/shared/school-days-radio';
import {
  Button,
  Flex,
  Icon,
  Spinner,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { TbFreezeRow } from 'react-icons/tb';
import TimePicker from 'react-time-picker';

/**
 * @param {Object} props
 * @param {FrontUserClass} props.klass
 * @param {React.MutableRefObject} props.portalRef
 * @param {boolean} props.isClosing
 */
export function AddScheduleForm({ portalRef, klass, isClosing }) {
  const classSchedule = useClassSchedule(klass);
  const { form, createMutation, onSubmit } = classSchedule;
  const { selectedCourse, setSelectedCourse, courseCollection } = classSchedule;
  const { finishTime, setFinishTime, data } = classSchedule;
  const { startTime, setStartTime, isLoadingCourses } = classSchedule;
  const { selectedDay, setSelectedDay } = classSchedule;

  useEffect(() => {
    if (isClosing) {
      form.reset();
      setSelectedCourse([]);
    }
  }, [form, isClosing, setSelectedCourse]);

  const { formState } = form;

  if (isLoadingCourses) {
    return (
      <Flex py='1rem' gap={2} justifyContent='center' alignItems='center'>
        <Spinner />
        <Text fontSize='1.3rem'>Loading courses...</Text>
      </Flex>
    );
  }

  if (!isLoadingCourses && !data.length) {
    return (
      <Flex py='1rem' gap={2} justifyContent='center' alignItems='center'>
        <EmptyState
          title='No courses found on this class yet'
          description={
            <Text as='span' fontSize='1rem'>
              There are no courses available for this class.
            </Text>
          }
          icon={
            <Icon fontSize='4rem'>
              <TbFreezeRow />
            </Icon>
          }
        >
          <Flex gap={2} justifyContent='center' alignItems='center'>
            <CreateNewCourseButton
              klass={klass}
              title='Add a course to class'
              colorPalette='blue'
            />
          </Flex>
        </EmptyState>
      </Flex>
    );
  }
  return (
    <Stack
      as='form'
      bgColor='white'
      color='cyan.900'
      rounded='lg'
      w='100%'
      alignSelf='center'
      gap='1rem'
      gapY='1.5rem'
      onSubmit={onSubmit}
    >
      <SelectRoot
        collection={courseCollection}
        value={selectedCourse}
        disabled={isLoadingCourses || !data.length}
        onValueChange={(e) => {
          setSelectedCourse(e.value);
          const found = data.find((c) => c.id === Number(e.value));
          if (found) {
            form.setValue('courseId', found?.id);
          }
        }}
        size='sm'
      >
        <SelectLabel>
          {isLoadingCourses ? <Spinner /> : 'Select the course'}
        </SelectLabel>
        <SelectTrigger>
          <SelectValueText
            placeholder={isLoadingCourses ? <Spinner /> : 'Course'}
          />
        </SelectTrigger>
        <SelectContent portalRef={portalRef}>
          {courseCollection.items.map((course) => (
            <SelectItem item={course} key={course.id}>
              {course.name}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <Input {...form.register('day')} display='none' />
      <SchoolDaysRadio
        onValueChange={(item) => {
          setSelectedDay(item.value);
          form.setValue('day', item.value);
        }}
        value={selectedDay}
      />
      <Flex gap={2} justifyContent='center' alignItems='center'>
        <UiField
          label='Start time'
          invalid={!!formState.errors.startTime}
          errorText={formState.errors.startTime?.message}
          required
        >
          <Input
            {...form.register('startTime', {
              required: 'Start time is required',
            })}
            display='none'
          />
          <TimePicker
            disableClock
            autoFocus
            onChange={(time) => {
              form.setValue('startTime', time);
              setStartTime(time);
              form.setError('startTime', null);
            }}
            onInvalidChange={() => {
              form.setError('startTime', { message: 'Incorrect time' });
            }}
            value={startTime}
            format='HH:mm'
            minTime='08:00'
            maxTime='19:00'
            required
          />
        </UiField>
        <UiField
          label='End time'
          invalid={!!formState.errors.endTime}
          errorText={formState.errors.endTime?.message}
          required
        >
          <Input
            {...form.register('endTime', {
              required: 'End time is required',
            })}
            display='none'
          />
          <TimePicker
            disableClock
            autoFocus
            value={finishTime}
            onChange={(time) => {
              form.setValue('endTime', time);
              setFinishTime(time);
              form.setError('endTime', null);
            }}
            onInvalidChange={() => {
              form.setError('endTime', { message: 'Incorrect time' });
            }}
            format='HH:mm'
            minTime='08:00'
            maxTime='19:00'
            required
          />
        </UiField>
      </Flex>
      <Field
        label='Note'
        invalid={!!formState.errors.note}
        errorText={formState.errors.note?.message}
        required
      >
        <Textarea
          autoresize
          variant='outline'
          {...form.register('note', {
            required: 'Note is required',
          })}
        />
      </Field>
      <Button
        colorPalette='blue'
        type='submit'
        loading={createMutation.isPending}
        loadingText='Saving...'
        disabled={!formState.isValid || !formState.isDirty}
      >
        Save Schedule
      </Button>
    </Stack>
  );
}
