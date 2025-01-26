import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { ClassRoomUsersListCard } from '@/components/ui/classes/class-room-users-list-card';
import { ClassStatsWithActions } from '@/components/ui/classes/class-stats-with-actions';
import {
  NoClassFound,
  NotAllowedToVisualize,
  NotFoundPageState,
} from '@/components/ui/classes/not-allowed-to-visualize';
import { getClassBySlug } from '@/lib/packages/classes/classes.service';
import { Card, Heading, Show, Stack } from '@chakra-ui/react';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export default async function ClassRoomsPage({ params: nextParams }) {
  const slug = (await nextParams).slug;
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
  /**
   * @type {Classe}
   */
  const klass = await getClassBySlug(slug);
  if (!klass) {
    return (
      <Stack
        h='100%'
        alignItems='center'
        justifyContent='center'
        bgColor='red.50'
        boxShadow='md'
        rounded='lg'
        p='1rem'
      >
        <NotFoundPageState />
      </Stack>
    );
  }
  return (
    <Stack gap='0.7rem'>
      <Card.Root w='100%'>
        <Card.Body py='1rem'>
          <Heading>The {klass.name} class</Heading>
        </Card.Body>
      </Card.Root>
      <Show when={!klass}>
        <NoClassFound />
      </Show>
      <Show when={klass}>
        <ClassStatsWithActions klass={klass} />
      </Show>
      <Show when={klass}>
        <ClassRoomUsersListCard klass={klass} role='student' />
      </Show>
      <Show when={klass}>
        <ClassRoomUsersListCard klass={klass} role='teacher' />
      </Show>
    </Stack>
  );
}
