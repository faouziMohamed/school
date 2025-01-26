import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { navBarItems } from '@/components/ui/modules/sidebar/nav-bar-items';
import {
  Card,
  Heading,
  Icon,
  LinkOverlay,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const currentDate = new Date();
  /**
   * @type {import('next-auth').Session}
   */
  const session = await getServerSession(authOptions);
  const user = session.user;
  const greetings =
    currentDate.getHours() < 12
      ? 'Good Morning'
      : currentDate.getHours() < 18
        ? 'Good Afternoon'
        : 'Good Evening';
  const role = user.role;
  return (
    <Stack gap='0.7rem'>
      <Card.Root w='100%'>
        <Card.Body py='1rem'>
          <Heading>Dashboard</Heading>
        </Card.Body>
      </Card.Root>
      <Stack>
        <Card.Root>
          <Card.Header>
            <Heading size='md'>
              {greetings}, {user.firstName}
            </Heading>
          </Card.Header>
          <Card.Body color='fg.muted'>You have</Card.Body>
        </Card.Root>
      </Stack>
      <SimpleGrid gap='0.7rem' columns={{ base: 1, sm: 2, lg: 3 }}>
        {navBarItems
          .filter(
            (item) => item.permissions.includes(role) && item.href !== '/',
          )
          .map((item) => (
            <Card.Root
              w='100%'
              key={item.id}
              css={{
                '&:hover': {
                  '& *': {
                    color: 'cyan.500',
                  },
                  '& .dashboard-icon': {
                    color: 'cyan.500',
                    transform: 'rotate(5deg)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                  '&:active .dashboard-icon': {
                    transform: 'rotate(-10deg)',
                  },
                },
              }}
            >
              <Card.Header>
                <Icon fontSize='4rem' className='dashboard-icon' asChild>
                  {item.Icon}
                </Icon>
                <Heading size='xl'>
                  <LinkOverlay asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </LinkOverlay>
                </Heading>
              </Card.Header>

              <Card.Body pt='0.7rem' fontSize='0.88rem' color='fg.muted'>
                {item.description}
              </Card.Body>
            </Card.Root>
          ))}
      </SimpleGrid>
    </Stack>
  );
}
