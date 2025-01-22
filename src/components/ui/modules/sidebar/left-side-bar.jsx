'use client';
import { navBarItems } from '@/components/ui/modules/sidebar/nav-bar-items';
import { capitalize } from '@/lib/helpers/utils';
import { Button, Link, List, Separator, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { MdExitToApp } from 'react-icons/md';

export function LeftSideBar() {
  const [active, setActive] = useState(-1);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  useEffect(() => {
    const activePath = navBarItems.find((item) =>
      item.href.startsWith(pathname),
    );
    if (activePath) {
      setActive(activePath.id);
    }
  }, [active, pathname]);
  return (
    <Stack
      maxW='18rem'
      w='100%'
      h='100%'
      bgColor={user.role === 'student' ? 'cyan.600' : 'gray.700'}
      color='#fff'
      as='header'
      pt='2rem'
      flexShrink={0}
      hideBelow='md'
    >
      <Stack px='1rem'>
        <Stack
          rounded='lg'
          bgColor={user.role === 'student' ? 'cyan.700' : 'gray.800'}
          px='1rem'
          py='0.7rem'
        >
          <Text
            fontSize='lg'
            fontWeight='bold'
            fontFamily='var(--font-tertiary)'
          >
            {user.firstName} {user.lastName}
          </Text>
          <Separator borderColor='gray.300' />
          <Text fontSize='md' fontFamily='var(--font-secondary)'>
            {capitalize(user.role)}
          </Text>
        </Stack>
      </Stack>
      <Stack py='3rem' justifyContent='space-between' flexGrow={1}>
        <List.Root
          px='1rem'
          display='flex'
          flexDirection='column'
          listStyle='none'
          gap='0.5rem'
        >
          {navBarItems
            .filter((item) => item.permissions.includes(user.role))
            .map((item) => (
              <List.Item key={item.id}>
                <Link
                  asChild
                  w='100%'
                  color='white'
                  px='0.5rem'
                  py='0.5rem'
                  fontSize='md'
                  bg={
                    Number(active) === Number(item.id)
                      ? 'blue.700'
                      : 'transparent'
                  }
                  fontFamily='var(--font-tertiary)'
                  rounded='md'
                  outline='none'
                  _hover={{
                    bg: user.role === 'student' ? 'blue.800' : 'blue.900',
                  }}
                  _active={{ bg: 'blue.900', scale: 0.95 }}
                >
                  <NextLink href={item.href}>
                    {item.Icon}
                    {item.name}
                  </NextLink>
                </Link>
              </List.Item>
            ))}
        </List.Root>
        <Stack>
          <Separator />
          <Button
            w='100%'
            variant='plain'
            color='cyan.50'
            fontFamily='var(--font-primary)'
            fontWeight='500'
            rounded='md'
            outline='none'
            px='1rem'
            _hover={{ bg: 'blue.700' }}
            _active={{ bg: 'blue.900', scale: 0.95 }}
            textAlign='start'
            justifyContent='flex-start'
            onClick={async () => {
              await signOut({ redirect: false });
              router.push('/login');
            }}
          >
            <MdExitToApp />
            Logout
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
