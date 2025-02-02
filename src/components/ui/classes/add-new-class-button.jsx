'use client';
import { Button } from '@/components/ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, Input } from '@/components/ui/field';
import { toaster } from '@/components/ui/toaster';
import { submitCreateNewClass } from '@/lib/packages/classes/actions/classes.action';
import { Stack, Text, Textarea } from '@chakra-ui/react';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';

const defaultValues = {
  name: '',
  description: '',
};

export function AddNewClassButton() {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const [state, action, isPending] = useActionState(submitCreateNewClass, {
    success: false,
    error: null,
  });
  /**
   * @type {import('react-hook-form').UseFormReturn<CreateNewClassInput> }
   */
  const form = useForm({ defaultValues });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (state.success) {
      toaster.success({
        title: 'Class created successfully',
      });
      onClose();
      reset();
    } else if (state.error) {
      toaster.error({
        title: 'Failed to create class',
        description: state.error,
      });
    }
  }, [reset, state]);

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      action(formData);
    });
  });

  return (
    <DialogRoot
      closeOnInteractOutside={false}
      lazyMount
      open={open}
      onOpenChange={(e) => {
        setOpen(e.open);
        reset();
      }}
      placement='center'
    >
      <DialogTrigger asChild>
        <Button>
          <MdAdd />
          New Class
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Text>Add a new Class</Text>
          </DialogTitle>
        </DialogHeader>
        <DialogBody pb='4'>
          <Stack gap='5' as='form' onSubmit={onSubmit} id='create-class'>
            <Field
              label='Class Name'
              invalid={!!errors.name}
              errorText={errors.name?.message}
              required
            >
              <Input
                {...register('name', {
                  required: 'The class name is required',
                  minLength: {
                    value: 3,
                    message: 'The class name must be at least 3 characters',
                  },
                })}
              />
            </Field>
            <Field
              label='Description'
              invalid={!!errors.description}
              errorText={errors.description?.message}
              required
            >
              <Textarea
                autoresize
                variant='outline'
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 3,
                    message: 'Description must be at least 3 characters',
                  },
                })}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant='outline' disabled={isPending}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            type='submit'
            loading={isPending}
            disabled={isPending}
            form='create-class'
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
