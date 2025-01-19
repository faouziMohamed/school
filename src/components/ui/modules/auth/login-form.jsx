'use client';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/field';
import { useLoginForm } from '@/components/ui/modules/auth/use-login-form';
import { requiredFielConfig } from '@/components/ui/modules/auth/use-register-form';
import { PasswordInput } from '@/components/ui/password-input';
import { AccountTypeRadio } from '@/components/ui/shared/account-type-radio';
import { emailRegex } from '@/lib/helpers/utils';
import { Link, Separator, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export function LoginForm() {
  const form = useLoginForm();
  const { errors, onSubmit, canSubmit } = form;
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
      <Field
        label='Email'
        invalid={!!errors.email?.message}
        errorText={errors.email?.message}
        required
      >
        <Input
          {...register('email', {
            required: requiredFielConfig,
            pattern: {
              value: emailRegex,
              message: 'Invalid email address',
            },
          })}
          type='email'
          autoComplete='email'
        />
      </Field>
      <Field
        label='Password'
        invalid={!!errors.password?.message}
        errorText={errors.password?.message}
        required
      >
        <PasswordInput
          {...register('password', {
            required: requiredFielConfig,
          })}
          type='password'
          autoComplete='new-password'
        />
      </Field>
      <Button
        type='submit'
        isLoading={isSubmitting}
        disabled={!canSubmit || isSubmitting}
      >
        Login
      </Button>
      <Separator />
      <Text color='gray.500' fontSize='sm'>
        Don&#39;t have an account?{' '}
        <Link color='cyan.500' _hover={{ textDecoration: 'underline' }} asChild>
          <NextLink href='/register'>Sign up</NextLink>
        </Link>
      </Text>
    </Stack>
  );
}
