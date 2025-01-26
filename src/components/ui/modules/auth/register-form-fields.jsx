import { Field, Input } from '@/components/ui/field';
import { requiredFielConfig } from '@/components/ui/modules/auth/use-register-form';
import {
  PasswordInput,
  PasswordStrengthMeter,
} from '@/components/ui/password-input';
import {
  emailRegex,
  getPasswordScore,
  passwordRegex,
  phoneRegex,
} from '@/lib/helpers/utils';
import { Stack } from '@chakra-ui/react';

/**
 * RegisterFormFields component
 * @param {object} props
 * @param {import('react-hook-form').FieldErrors<CreateUserInput>} props.errors
 * @param {import('react-hook-form').UseFormRegister<CreateUserInput>} props.register
 * @param {import('react-hook-form').UseFormWatch<CreateUserInput>} props.watch
 */
export function RegisterFormFields({ errors, register, watch }) {
  return (
    <>
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
        errorText={
          getPasswordScore(watch('password')).message ||
          errors.password?.message
        }
        required
      >
        <Stack>
          <PasswordInput
            {...register('password', {
              required: requiredFielConfig,
              pattern: {
                value: passwordRegex,
                message:
                  'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and at least 6 characters',
              },
            })}
            type='password'
            autoComplete='new-password'
          />
          <PasswordStrengthMeter max={10} password={watch('password') || ''} />
        </Stack>
      </Field>
      <Field
        label='First Name'
        invalid={!!errors.firstName?.message}
        errorText={errors.firstName?.message}
        required
      >
        <Input
          {...register('firstName', {
            required: requiredFielConfig,
            minLength: {
              value: 2,
              message: 'The first name must be at least 2 characters',
            },
          })}
          autoComplete='given-name'
        />
      </Field>
      <Field
        label='Last Name'
        invalid={!!errors.lastName?.message}
        errorText={errors.lastName?.message}
        required
      >
        <Input
          {...register('lastName', {
            required: requiredFielConfig,
            minLength: {
              value: 2,
              message: 'The last name must be at least 2 characters',
            },
          })}
          autoComplete='family-name'
        />
      </Field>
      <Field
        label='Phone'
        invalid={!!errors.phone?.message}
        errorText={errors.phone?.message}
        required
      >
        <Input
          {...register('phone', {
            required: requiredFielConfig,
            pattern: {
              value: phoneRegex,
              message: 'Invalid phone number',
            },
          })}
          autoComplete='tel'
        />
      </Field>
    </>
  );
}
