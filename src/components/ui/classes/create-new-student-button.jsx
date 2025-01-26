'use client';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CreateNewStudentForm } from '@/components/ui/classes/create-new-student-form';
import { SelectUser } from '@/components/ui/classes/select-user';
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
import { submitCreateNewStudentForGivenClass } from '@/lib/packages/classes/actions/students.action';
import { IconButton, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { useActionState, useState } from 'react';
import { BsPlusSquareFill } from 'react-icons/bs';

/**
 *
 * @param {object} props
 * @param {Classe} props.klass
 */
export function CreateNewStudentButton({ klass }) {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const [state, action, isPending] = useActionState(
    submitCreateNewStudentForGivenClass,
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
            <Text>Add a new Student to this class ({klass.name})</Text>
          </DialogTitle>
        </DialogHeader>
        <DialogBody pb='4'>
          <Alert fontSize='sm'>
            Here you can search for a student to add to this class below or
            create a new student account.
          </Alert>
          <Stack pt='1rem'>
            <SelectUser onClose={onClose} klass={klass} role='student' />
          </Stack>
          <Text
            textAlign='center'
            fontSize='sm'
            fontWeight={600}
            color='gray.600'
            py='1.3rem'
          >
            Or create a new student
          </Text>
          <Stack gap='5'>
            <CreateNewStudentForm
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
