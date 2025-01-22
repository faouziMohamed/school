import { RegisterForm } from '@/components/ui/modules/auth/register-form';
import { Heading, Stack, Text } from '@chakra-ui/react';

export default function RegisterPage() {
  return (
    <Stack gap='2rem'>
      <Stack>
        <Heading fontWeight={600} size='5xl' fontFamily='var(--font-secondary)'>
          Register for an account
        </Heading>
        <Text fontSize='lg' fontFamily='font-tertiary'>
          Create an account to access the full features of the School Management
          System. You can register as a student or a teacher.
        </Text>
      </Stack>
      <RegisterForm />
    </Stack>
  );
}
