'use client';
import { Button } from '@/components/ui/button';
import { RegisterFormFields } from '@/components/ui/modules/auth/register-form-fields';
import { useRegisterForm } from '@/components/ui/modules/auth/use-register-form';
import { AccountTypeRadio } from '@/components/ui/shared/account-type-radio';
import { Link, Separator, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

/**
 * LoginForm component
 * @param {object} props
 * @param {string} props.redirectTo
 */
export function RegisterForm({ redirectTo }) {
  const form = useRegisterForm({ redirectTo });
  const { errors, onSubmit, watch, canSubmit } = form;
  const { selected, setSelected, register, isSubmitting } = form;
  return (
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
      <Stack>
        <AccountTypeRadio
          onValueChange={(item) => setSelected(item.value)}
          value={selected}
        />
        <Separator />
      </Stack>
      <RegisterFormFields errors={errors} register={register} watch={watch} />
      <Button
        type='submit'
        loading={isSubmitting}
        disabled={!canSubmit || isSubmitting}
      >
        Register
      </Button>
      <Separator />
      <Text color='gray.500' fontSize='sm'>
        Already have an account?{' '}
        <Link color='cyan.500' _hover={{ textDecoration: 'underline' }} asChild>
          <NextLink href='/login'>Login</NextLink>
        </Link>
      </Text>
    </Stack>
  );
}
