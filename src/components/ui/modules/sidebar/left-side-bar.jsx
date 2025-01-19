'use client';
import { navBarItems } from '@/components/ui/modules/sidebar/nav-bar-items';
import { Link, List, Separator, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function LeftSideBar() {
  const [active, setActive] = useState(-1);
  const pathname = usePathname();

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
      maxW='20rem'
      w='100%'
      h='100%'
      bgColor='cyan.600'
      color='#fff'
      as='header'
      pt='2rem'
      flexShrink={0}
    >
      <Stack px='1rem'>
        <Stack rounded='lg' bgColor='cyan.700' px='1rem' py='0.7rem'>
          <Text
            fontSize='lg'
            fontWeight='bold'
            fontFamily='var(--font-tertiary)'
          >
            Faouzi Mohamed
          </Text>
          <Separator borderColor='gray.300' />
          <Text fontSize='md' fontFamily='var(--font-secondary)'>
            Software Engineer
          </Text>
        </Stack>
      </Stack>
      <Stack pt='3rem' px='1rem'>
        <List.Root display='flex' flexDirection='column' listStyle='none'>
          {navBarItems.map((item) => (
            <List.Item key={item.id}>
              <Link
                asChild
                w='100%'
                color='cyan.50'
                px='1rem'
                py='0.5rem'
                bg={
                  Number(active) === Number(item.id)
                    ? 'blue.700'
                    : 'transparent'
                }
                fontFamily='var(--font-primary)'
                fontWeight='500'
                rounded='md'
                _hover={{ bg: 'blue.800' }}
                _active={{ bg: 'blue.900', scale: 0.95 }}
              >
                <NextLink href={item.href}>{item.name}</NextLink>
              </Link>
            </List.Item>
          ))}
        </List.Root>
      </Stack>
    </Stack>
  );
}
