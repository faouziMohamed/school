'use client';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CreateNewCourseForm } from '@/components/ui/classes/courses/create-new-course-form';
import { SelectCourse } from '@/components/ui/classes/courses/select-course';
import { SelectTeacherForCourseCreate } from '@/components/ui/classes/courses/select-teacher-for-course-create';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UiField } from '@/components/ui/field';
import { useTeachersByClassIdQuery } from '@/lib/packages/classes/class.queries';
import {
  createListCollection,
  Icon,
  IconButton,
  Show,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useMemo, useRef, useState } from 'react';
import { BsPlusSquareFill } from 'react-icons/bs';

/**
 * @param {object} props
 * @param {Classe} props.klass
 * @param {string} [props.title='']
 * @param {string} [props.colorPalette]
 */
export function CreateNewCourseButton({ klass, title = '', colorPalette }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const onClose = () => {
    setOpen(false);
    setSubmitting(false);
  };

  const [value, setValue] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const {
    data = [],
    isLoading,
    refetch,
  } = useTeachersByClassIdQuery({ classId: klass.id });
  const courseCollection = useMemo(
    /**
     * @returns {import('@chakra-ui/react').ListCollection<FrontTeacher>}
     */
    () => {
      return createListCollection({
        items: data || [],
        itemToString: (item) => `${item.firstName} ${item.lastName}`,
        itemToValue: (item) => item.classTeacherId,
      });
    },
    [data],
  );
  const contentRef = useRef(null);
  return (
    <DialogRoot
      closeOnInteractOutside={false}
      scrollBehavior='inside'
      lazyMount
      open={open}
      onOpenChange={(e) => {
        setOpen(e.open);
        if (!e.open) {
          setValue([]);
          setTeacher(null);
        } else {
          void refetch();
        }
      }}
      placement='center'
    >
      <DialogTrigger size='sm' colorPalette={colorPalette} asChild>
        {title ? (
          <Button>
            <Icon>
              <BsPlusSquareFill />
            </Icon>
            <Text>{title}</Text>
          </Button>
        ) : (
          <IconButton>
            <BsPlusSquareFill />
          </IconButton>
        )}
      </DialogTrigger>
      <DialogContent m='0.5rem' ref={contentRef}>
        <DialogHeader>
          <DialogTitle>
            <Text>Add a new Course to this class ({klass.name})</Text>
          </DialogTitle>
        </DialogHeader>
        <DialogBody pb='4'>
          <Show
            when={klass._count.classTeachers > 0}
            fallback={
              <Alert fontSize='sm' status='warning'>
                You need to add a teacher to this class before adding a course.
              </Alert>
            }
          >
            <Alert fontSize='sm'>
              Here you can search for a course to add to this class below or
              create a add new course.
            </Alert>
            <Show when={!isLoading} fallback={<Spinner />}>
              <Stack pt='1rem' w='100%'>
                <UiField label='Teacher' w='100%'>
                  <SelectTeacherForCourseCreate
                    portalRef={contentRef}
                    collection={courseCollection}
                    value={value}
                    onValueChange={(e) => {
                      const [id] = e.value;
                      setValue(e.value);
                      const found = data.find((c) => c.classTeacherId === id);
                      setTeacher(found);
                    }}
                  />
                </UiField>
              </Stack>
            </Show>
            <Show when={teacher}>
              <Stack pt='1rem'>
                <SelectCourse
                  onClose={onClose}
                  klass={klass}
                  teacher={teacher}
                />
              </Stack>
              <Text
                textAlign='center'
                fontSize='sm'
                fontWeight={600}
                color='gray.600'
                py='1.3rem'
              >
                Or create a new course
              </Text>
              <Stack gap='5'>
                <CreateNewCourseForm
                  onClose={onClose}
                  setSubmitting={setSubmitting}
                  klass={klass}
                  teacher={teacher}
                />
              </Stack>
            </Show>
          </Show>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button disabled={submitting}>Close</Button>
          </DialogActionTrigger>
        </DialogFooter>

        <DialogCloseTrigger disabled={submitting} />
      </DialogContent>
    </DialogRoot>
  );
}
