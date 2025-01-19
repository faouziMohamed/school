'use client';
import { toaster } from '@/components/ui/toaster';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const defaultValues = { email: '', password: '' };
export const requiredFielConfig = {
  value: true,
  message: 'This field is required',
};

export function useLoginForm() {
  /**
   * @type {import("react-hook-form").UseFormReturn<LoginInput>}
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
     * @type {LoginBody}
     */
    const submitData = {
      email: data.email.trim().toLowerCase(),
      password: data.password,
      role: selected,
      action: 'login',
    };
    setIsSubmitting(true);
    try {
      const response = await signIn('credentials', {
        ...submitData,
        redirect: false,
      });
      console.log(response);
      setIsSubmitting(false);
      if (response.error || !response.ok) {
        handleSubmitError(response, setError);
        return;
      }
      toaster.create({
        type: 'success',
        title: 'Login successful',
        description: `Welcome back 👋`,
      });
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
      jsonRes?.description || 'Sorry, We could not process your request',
    type: 'error',
    duration: 7000,
  });
  setError('email', {
    type: 'manual',
    message: jsonRes?.message || 'An error occurred',
  });
  setError('password', {
    type: 'manual',
    message: jsonRes?.message || 'An error occurred',
  });
}
