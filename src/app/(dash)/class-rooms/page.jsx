import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { ClassListCard } from '@/components/ui/classes/class-list-card';
import { NotAllowedToVisualize } from '@/components/ui/classes/not-allowed-to-visualize';
import { EmptyState } from '@/components/ui/empty-state';
import { getAllClasses } from '@/lib/packages/classes/classes.service';
import { Card, Heading, Show, Stack } from '@chakra-ui/react';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export default async function ClassRoomsPage() {
  /**
   * @type {import('next-auth').Session}
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
        <ClassListCard classes={classes} />
      </Show>
    </Stack>
  );
}
