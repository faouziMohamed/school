import { AllClassListed } from '@/app/(dash)/class-rooms/all-class-listed';
import { NotAllowedToVisualize } from '@/app/(dash)/class-rooms/not-allowed-to-visualize';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { getAllClasses } from '@/lib/packages/classes/classes.service';
import { Card, Heading, Show, Stack } from '@chakra-ui/react';
import { getServerSession } from 'next-auth';
import { MdAdd } from 'react-icons/md';

export default async function Home() {
  /**
   * @type {import("next-auth").Session}
   */
  const session = await getServerSession(authOptions);
  const user = session.user;
  const role = user.role;
  if (role !== 'admin') {
    return (
      <Stack
        h='100%'
        alignItems='center'
        justifyContent='center'
        bgColor='yellow.100'
        boxShadow='md'
        p='1rem'
      >
        <NotAllowedToVisualize />
      </Stack>
    );
  }
  const classes = await getAllClasses();
  return (
    <Stack gap='0.7rem'>
      <Card.Root w='100%'>
        <Card.Body py='1rem'>
          <Heading>Class Rooms</Heading>
        </Card.Body>
      </Card.Root>
      <Show when={!classes.length}>
        <EmptyState
          title='No classes found'
          description='Create a class to get started'
        />
      </Show>
      <Show when={classes.length}>
        <Card.Root w='100%'>
          <Card.Header
            justifyContent='space-between'
            flexDirection={{ sm: 'row' }}
          >
            <Heading size='md'>Class Rooms</Heading>
            <Button>
              <MdAdd />
              New Class
            </Button>
          </Card.Header>
          <Card.Body color='fg.muted'>
            <AllClassListed classes={classes} />
          </Card.Body>
        </Card.Root>
      </Show>
    </Stack>
  );
}
