import { RegisterFormFields } from '@/components/ui/modules/auth/register-form-fields';
import { toaster } from '@/components/ui/toaster';
import { capitalize } from '@/lib/helpers/utils';
import { Button, Fieldset, Stack } from '@chakra-ui/react';
import { startTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';

/**
 * @type {CreateUserInput}
 * */
const defaultValues = {
  firstName: '',
  lastName: '',
  password: '',
  email: '',
  phone: '',
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
export function CreateNewStudentForm({
  onClose,
  state,
  action,
  isPending,
  klass,
  role,
}) {
  /**
   * @type {import('react-hook-form').UseFormReturn<CreateUserInput> }
   */
  const form = useForm({ defaultValues });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (state.success) {
      toaster.success({
        title: `${capitalize(role)} created successfully`,
      });
      onClose?.();
      state.success = false;
    } else if (state.error) {
      toaster.error({
        title: `Failed to create the ${role}`,
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
      formData.append('classId', klass.id);
      formData.append('slug', klass.slug);
      action(formData);
    });
  });

  return (
    <Fieldset.Root size='lg' maxW='md'>
      <Stack>
        <Fieldset.Legend>{capitalize(role)} details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your {role}&#39;s details below
        </Fieldset.HelperText>
      </Stack>

      <Stack
        onSubmit={onSubmit}
        as='form'
        px='1rem'
        py='1.5rem'
        bgColor='white'
        color='cyan.900'
        rounded='lg'
        w='100%'
        alignSelf='center'
        boxShadow='md'
        gap='1rem'
        gapY='1.5rem'
      >
        <RegisterFormFields errors={errors} register={register} watch={watch} />
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
