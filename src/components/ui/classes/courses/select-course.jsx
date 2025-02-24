'use client';
import { useAddCourseToClass } from '@/components/ui/classes/courses/use-add-course-to-class';
import { Field, Input } from '@/components/ui/field';
import { InputGroup } from '@/components/ui/input-group';
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover';
import { capitalize } from '@/lib/helpers/utils';
import {
  Box,
  Button,
  Flex,
  For,
  Heading,
  Icon,
  List,
  Show,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { PiNotebookFill } from 'react-icons/pi';
import { SiGoogleclassroom } from 'react-icons/si';

/**
 *
 * @param {object} props
 * @param {() => void} props.onClose
 * @param {Classe} props.klass
 * @param {FrontTeacher} props.teacher
 */
export function SelectCourse({ onClose, klass, teacher }) {
  const hook = useAddCourseToClass(onClose, klass, teacher);
  const { courses, onAddCourseToClass } = hook;
  const { open, setOpen, ref, handleSearch } = hook;
  const { submitting, fetchingCourses } = hook;
  const { selectedCourse, setSelectedCourse } = hook;
  return (
    <Stack>
      <Show when={!!selectedCourse}>
        <Flex shadow='md' bgColor='blue.50' px='1rem' py='0.5rem'>
          <SelectedCourse selectedCourse={selectedCourse} />
          <Box flexBasis='30%' flexShrink={0}>
            <Button
              colorPalette='blue'
              onClick={onAddCourseToClass}
              loading={submitting}
              spinnerPlacement='end'
              loadingText='Adding to class...'
              disabled={submitting}
            >
              Add to class
            </Button>
          </Box>
        </Flex>
      </Show>
      <PopoverRoot
        open={open && courses?.length > 0}
        onOpenChange={(e) => setOpen(e.open)}
        positioning={{ sameWidth: true, placement: 'bottom' }}
        initialFocusEl={() => ref.current}
      >
        <PopoverTrigger asChild>
          <Field
            label={`Search for a course to add to ${klass?.name}`}
            pt='1rem'
          >
            <InputGroup
              endElement={
                fetchingCourses ? <Spinner /> : <PiNotebookFill size='1.5rem' />
              }
              w='100%'
            >
              <Input
                ref={ref}
                autoComplete='off'
                onChange={async (e) => handleSearch(e.target.value)}
              />
            </InputGroup>
          </Field>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody p='0.5rem'>
            <List.Root variant='plain' gap='0.5rem'>
              <For each={courses}>
                {
                  /**
                   * @param {FrontCourse} course
                   */
                  (course) => (
                    <SelectableCourse
                      key={course.id}
                      onClick={() => {
                        setSelectedCourse(course);
                        setOpen(false);
                      }}
                      course={course}
                    />
                  )
                }
              </For>
            </List.Root>
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    </Stack>
  );
}

/**
 * @param {object} props
 * @param {FrontCourse} props.course
 * @param {() => void} props.onClick
 */
function SelectableCourse({ onClick, course }) {
  return (
    <Button
      variant='subtle'
      justifyContent='flex-start'
      alignItems='flex-start'
      py='0.5rem'
      asChild
      minH='none'
      height='auto'
      onClick={onClick}
    >
      <List.Item>
        <List.Indicator>
          <Show when={!!course?.correlation?.length}>
            <Text
              as='span'
              fontFamilly='var(--font-secondary)'
              color='fg.muted'
              display='inline'
              fontSize='xs'
            >
              {course.correlation?.length}
            </Text>{' '}
          </Show>
          {course?.correlation?.length > 0 ? '📖' : '📚'}
        </List.Indicator>
        <Stack gap={0} justifyContent='flex-start'>
          <Heading size='sm' p={0}>
            {course.name}
          </Heading>
          <Text color='fg.muted'>{course.description}</Text>
        </Stack>
      </List.Item>
    </Button>
  );
}

/**
 * @param {object} props
 * @param {FrontCourse} props.selectedCourse
 */
function SelectedCourse({ selectedCourse }) {
  const description =
    selectedCourse.description.length > 50
      ? selectedCourse.description.slice(0, 50) + '...'
      : selectedCourse.description;
  return (
    <Stack flexGrow={1}>
      <Stack gap={0} justifyContent='flex-start'>
        <Heading size='sm' p={0}>
          {selectedCourse.name}
        </Heading>
        <Text color='fg.muted'>{description}</Text>
      </Stack>
      <Show when={!!selectedCourse.correlation.length}>
        <Stack
          color='fg.muted'
          flexDirection='row'
          gap='0.5rem'
          aligmItems='center'
        >
          <Icon fontSize='1.5em'>
            <SiGoogleclassroom />
          </Icon>
          <Box as='span'>
            {selectedCourse.correlation
              .map(
                /**
                 * @param {FrontCourseCorrelation} klass
                 */
                (klass) => capitalize(klass.className),
              )
              .join(' | ')}
          </Box>
        </Stack>
      </Show>
    </Stack>
  );
}
