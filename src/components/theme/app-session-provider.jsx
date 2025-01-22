'use client';

import { Box, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export function AppSessionProvider({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error...</div>;

  if (!session) {
    router.push('/login');

    return (
      <Box>
        <Text>
          User not authenticated. Please login to continue.
          <Link>
            <NextLink href='/login'>Login</NextLink>
          </Link>
        </Text>
      </Box>
    );
  }
  return children;
}
