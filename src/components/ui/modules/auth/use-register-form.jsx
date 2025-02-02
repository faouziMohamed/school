'use client';
import { toaster } from '@/components/ui/toaster';
import { capitalizeWords } from '@/lib/helpers/utils';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
};
export const requiredFielConfig = {
  value: true,
  message: 'This field is required',
};

export function useRegisterForm({ redirectTo }) {
  /**
   * @type {import('react-hook-form').UseFormReturn<CreateUserInput>}
   */
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    watch,
    reset,
    setError,
  } = useForm({
    defaultValues,
    mode: 'all',
    shouldFocusError: true,
    criteriaMode: 'all',
  });
  const [selected, setSelected] = useState('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    /**
     * @type {CreateUserBody}
     */
    const submitData = {
      firstName: capitalizeWords(data.firstName.trim()),
      lastName: capitalizeWords(data.lastName.trim()),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      password: data.password,
      role: selected,
      action: 'register',
    };
    setIsSubmitting(true);
    try {
      const response = await signIn('credentials', {
        ...submitData,
        redirect: false,
      });
      if (response.error || !response.ok) {
        setIsSubmitting(false);
        handleSubmitError(response, setError);
        return;
      }
      toaster.create({
        type: 'success',
        title: 'Account created successfully',
      });
      if (redirectTo) {
        router.push(redirectTo);
        return;
      }
      router.push('/');
      reset();
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  });
  return {
    selected,
    setSelected,
    register,
    errors,
    onSubmit,
    watch,
    canSubmit: isDirty && isValid,
    isSubmitting,
  };
}

function handleSubmitError(response, setError) {
  const { error } = response;
  let jsonRes = { message: 'An error occurred', description: '' };
  try {
    jsonRes = JSON.parse(error);
  } catch (e) {
    jsonRes = { message: 'An error occurred' };
  }
  toaster.create({
    title: jsonRes?.message || 'An error occurred',
    description:
      jsonRes?.description || 'Sorry, We could not create your account',
    type: 'error',
    duration: 7000,
  });
  setError('email', {
    type: 'manual',
    message: jsonRes?.message || 'An error occurred',
  });
}
