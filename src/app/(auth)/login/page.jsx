import { LoginForm } from '@/components/ui/modules/auth/login-form';
import { Heading, Stack, Text } from '@chakra-ui/react';

export default async function LoginPage({ searchParams: search }) {
  const next = (await search).next;
  return (
    <Stack gap='2rem'>
      <Stack>
        <Heading fontWeight={600} size='5xl' fontFamily='var(--font-secondary)'>
          Login to your account
        </Heading>
        <Text fontSize='lg' fontFamily='font-tertiary'>
          Login to access the full features of the School Management System. You
          can login as a student or a teacher.
        </Text>
      </Stack>
      <LoginForm redirectTo={next} />
    </Stack>
  );
}
