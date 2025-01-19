"use client";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import {
  requiredFielConfig,
  useRegisterForm,
} from "@/components/ui/modules/auth/use-register-form";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";
import { AccountTypeRadio } from "@/components/ui/shared/account-type-radio";
import {
  emailRegex,
  getPasswordScore,
  passwordRegex,
  phoneRegex,
} from "@/lib/helpers/utils";
import { Link, Separator, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export function RegisterForm() {
  const form = useRegisterForm();
  const { errors, onSubmit, watch, canSubmit } = form;
  const { selected, setSelected, register, isSubmitting } = form;
  return (
    <Stack
      onSubmit={onSubmit}
      as="form"
      px="1rem"
      py="1.5rem"
      bgColor="white"
      color="cyan.900"
      rounded="lg"
      w="100%"
      alignSelf="center"
      boxShadow="md"
      gap="1rem"
      gapY="1.5rem"
    >
      <Stack>
        <AccountTypeRadio
          onValueChange={(item) => setSelected(item.value)}
          value={selected}
        />
        <Separator />
      </Stack>
      <Field
        label="Email"
        invalid={!!errors.email?.message}
        errorText={errors.email?.message}
        required
      >
        <Input
          {...register("email", {
            required: requiredFielConfig,
            pattern: {
              value: emailRegex,
              message: "Invalid email address",
            },
          })}
          type="email"
          autoComplete="email"
        />
      </Field>
      <Field
        label="Password"
        invalid={!!errors.password?.message}
        errorText={
          getPasswordScore(watch("password")).message ||
          errors.password?.message
        }
        required
      >
        <Stack>
          <PasswordInput
            {...register("password", {
              required: requiredFielConfig,
              pattern: {
                value: passwordRegex,
                message:
                  "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and at least 6 characters",
              },
            })}
            type="password"
            autoComplete="new-password"
          />
          <PasswordStrengthMeter max={10} password={watch("password") || ""} />
        </Stack>
      </Field>
      <Field
        label="First Name"
        invalid={!!errors.firstName?.message}
        errorText={errors.firstName?.message}
        required
      >
        <Input
          {...register("firstName", {
            required: requiredFielConfig,
            minLength: {
              value: 2,
              message: "The first name must be at least 2 characters",
            },
          })}
          autoComplete="given-name"
        />
      </Field>
      <Field
        label="Last Name"
        invalid={!!errors.lastName?.message}
        errorText={errors.lastName?.message}
        required
      >
        <Input
          {...register("lastName", {
            required: requiredFielConfig,
            minLength: {
              value: 2,
              message: "The last name must be at least 2 characters",
            },
          })}
          autoComplete="family-name"
        />
      </Field>
      <Field
        label="Phone"
        invalid={!!errors.phone?.message}
        errorText={errors.phone?.message}
        required
      >
        <Input
          {...register("phone", {
            required: requiredFielConfig,
            pattern: {
              value: phoneRegex,
              message: "Invalid phone number",
            },
          })}
          autoComplete="tel"
        />
      </Field>
      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={!canSubmit || isSubmitting}
      >
        Register
      </Button>
      <Separator />
      <Text color="gray.500" fontSize="sm">
        Already have an account?{" "}
        <Link color="cyan.500" _hover={{ textDecoration: "underline" }} asChild>
          <NextLink href="/login">Login</NextLink>
        </Link>
      </Text>
    </Stack>
  );
}
