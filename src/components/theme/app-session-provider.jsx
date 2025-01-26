'use client';

import { Button } from '@/components/ui/button';
import { AbsoluteCenter, Icon, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';
import { FaLock } from 'react-icons/fa';
import { TiLockOpen } from 'react-icons/ti';

export function AppSessionProvider({ children }) {
  const { data: session, status } = useSession();
  // const router = useRouter();
  if (status === 'loading')
    return (
      <Stack bg='blue.50' position='absolute' inset={0}>
        <AbsoluteCenter>
          <Stack>
            <Icon fontSize='4rem'>
              <TiLockOpen />
            </Icon>
            <Text fontWeight={500}>Loading...</Text>
          </Stack>
        </AbsoluteCenter>
      </Stack>
    );
  if (status === 'error') return <div>Error...</div>;

  if (!session && status === 'unauthenticated') {
    // router.push('/login');
    return (
      <Stack bg='red.50' position='absolute' inset={0}>
        <AbsoluteCenter>
          <Stack alignItems='center' width='max-content'>
            <Icon fontSize='4rem' color='red.700'>
              <FaLock />
            </Icon>
            <Stack textAlign='center' fontWeight={500} w='100%'>
              <Text>User not authenticated.</Text>
              <Text>
                Please
                <Button
                  colorPalette='red'
                  variant='ghost'
                  fontSize='1rem'
                  pt='0'
                  h='auto'
                  px='0.5rem'
                  borderBlockEndWidth='1px'
                  asChild
                >
                  <Link>
                    <NextLink href='/login'>login</NextLink>
                  </Link>
                </Button>
                to continue.
              </Text>
            </Stack>
          </Stack>
        </AbsoluteCenter>
      </Stack>
    );
  }
  return children;
}
