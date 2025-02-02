'use client';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CreateNewCourseForm } from '@/components/ui/classes/courses/create-new-course-form';
import { SelectCourse } from '@/components/ui/classes/courses/select-course';
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
import { submitCreateNewCourseForGivenClass } from '@/lib/packages/classes/actions/courses.action';
import { IconButton, Stack, Text } from '@chakra-ui/react';
import { useActionState, useState } from 'react';
import { BsPlusSquareFill } from 'react-icons/bs';

/**
 * @param {object} props
 * @param {Classe} props.klass
 */
export function CreateNewCourseButton({ klass }) {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const [state, action, isPending] = useActionState(
    submitCreateNewCourseForGivenClass,
    { success: false, error: null },
  );

  return (
    <DialogRoot
      closeOnInteractOutside={false}
      scrollBehavior='inside'
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement='center'
    >
      <DialogTrigger asChild>
        <IconButton>
          <BsPlusSquareFill />
        </IconButton>
      </DialogTrigger>
      <DialogContent m='0.5rem'>
        <DialogHeader>
          <DialogTitle>
            <Text>Add a new Course to this class ({klass.name})</Text>
          </DialogTitle>
        </DialogHeader>
        <DialogBody pb='4'>
          <Alert fontSize='sm'>
            Here you can search for a course to add to this class below or
            create a add new course.
          </Alert>
          <Stack pt='1rem'>
            <SelectCourse onClose={onClose} klass={klass} />
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
              state={state}
              action={action}
              loading={isPending}
              klass={klass}
              role='student'
            />
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button>Close</Button>
          </DialogActionTrigger>
        </DialogFooter>

        <DialogCloseTrigger disabled={isPending} />
      </DialogContent>
    </DialogRoot>
  );
}
