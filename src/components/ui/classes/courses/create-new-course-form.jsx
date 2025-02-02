import { Field, Input } from '@/components/ui/field';
import { requiredFielConfig } from '@/components/ui/modules/auth/use-register-form';
import { toaster } from '@/components/ui/toaster';
import { Button, Fieldset, Stack, Textarea } from '@chakra-ui/react';
import { startTransition, useEffect } from 'react';
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
 * @param {any} props.state
 * @param {(formData:FormData) => void} props.action
 * @param {boolean} props.isPending
 * @param {Classe} props.klass
 * @param {FrontUserRole} props.role
 */
export function CreateNewCourseForm({
  onClose,
  state,
  action,
  isPending,
  klass,
  role,
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

  useEffect(() => {
    if (state.success) {
      toaster.success({
        title: `Course created successfully`,
      });
      onClose?.();
      state.success = false;
    } else if (state.error) {
      toaster.error({
        title: `Failed to create the course`,
        description: state.error,
      });
    }
  }, [onClose, reset, role, state]);

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      formData.append('classId', `${klass.id}`);
      formData.append('slug', klass.slug);
      action(formData);
    });
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
          loading={isPending}
          loadingText='Saving...'
          spinnerPlacement='start'
          disabled={isPending}
        >
          Save
        </Button>
      </Stack>
    </Fieldset.Root>
  );
}
