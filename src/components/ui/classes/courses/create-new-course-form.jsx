import { Field, Input } from '@/components/ui/field';
import { requiredFielConfig } from '@/components/ui/modules/auth/use-register-form';
import { toaster } from '@/components/ui/toaster';
import { useCreateCourseMutation } from '@/lib/packages/courses/courses.queries';
import { Button, Fieldset, Stack, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

/**
 * @type {CreateUserInput}
 * */
const defaultValues = {
  name: '',
  description: '',
};

/**
 *
 * @param {object} props
 * @param {() => void} props.onClose
 * @param {(val:boolean) => void} props.setSubmitting
 * @param {Classe} props.klass
 * @param {FrontTeacher} props.teacher
 */
export function CreateNewCourseForm({
  onClose,
  setSubmitting,
  klass,
  teacher,
}) {
  /**
   * @type {import('react-hook-form').UseFormReturn<CreateNewCourseInput> }
   */
  const form = useForm({ defaultValues });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const createCourseMutation = useCreateCourseMutation({ classId: klass.id });

  const onSubmit = handleSubmit(async (data) => {
    const body = {
      ...data,
      classTeacherId: teacher.id,
      classId: klass.id,
    };
    console.log('data', body);
    try {
      setSubmitting(true);
      const response = await createCourseMutation.mutateAsync(body);
      setSubmitting(false);
      if ('status' in response) {
        console.log('error', response.error);
        toaster.error({
          title: `Failed to create the course`,
          description: response.error,
        });
        return;
      }
      toaster.success({ title: `Course created successfully` });
      reset();
      onClose?.();
    } catch (error) {
      setSubmitting(false);
      console.log('error', error);
      toaster.error({
        title: `Failed to create the course`,
      });
    }
  });

  return (
    <Fieldset.Root size='lg' maxW='md'>
      <Stack>
        <Fieldset.Legend>Course details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your course&#39;s details below
        </Fieldset.HelperText>
      </Stack>

      <Stack
        onSubmit={onSubmit}
        as='form'
        py='1.5rem'
        bgColor='white'
        color='cyan.900'
        rounded='lg'
        w='100%'
        alignSelf='center'
        gap='1rem'
        gapY='1.5rem'
      >
        <Field
          label='Course Name'
          invalid={!!errors.name?.message}
          errorText={errors.name?.message}
          required
        >
          <Input
            {...register('name', {
              required: requiredFielConfig,
              minLength: {
                value: 2,
                message: 'The last name must be at least 2 characters',
              },
            })}
            autoComplete='off'
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
        <Button
          colorPalette='blue'
          type='submit'
          loading={createCourseMutation.isPending}
          loadingText='Saving...'
          spinnerPlacement='start'
          disabled={createCourseMutation.isPending}
        >
          Save
        </Button>
      </Stack>
    </Fieldset.Root>
  );
}
