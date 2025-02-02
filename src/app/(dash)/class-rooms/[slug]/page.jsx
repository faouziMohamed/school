import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { ClassStatsWithActions } from '@/components/ui/classes/class-stats-with-actions';
import { ClassRoomCoursesListCard } from '@/components/ui/classes/courses/class-room-courses-list-card';
import {
  NoClassFound,
  NotAllowedToVisualize,
  NotFoundPageState,
} from '@/components/ui/classes/not-allowed-to-visualize';
import { ClassRoomUsersListCard } from '@/components/ui/classes/users/class-room-users-list-card';
import { capitalize } from '@/lib/helpers/utils';
import { getClassBySlug } from '@/lib/packages/classes/classes.service';
import { Card, Heading, Show, Stack, Tabs } from '@chakra-ui/react';
import { getServerSession } from 'next-auth';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { LuSquareCheck, LuUser } from 'react-icons/lu';

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
    <Stack gap='0.7rem' overflowX='hidden' w='100%'>
      <Card.Root w='100%'>
        <Card.Body py='1rem'>
          <Heading>The {capitalize(klass.name)} class</Heading>
        </Card.Body>
      </Card.Root>
      <Show when={!klass}>
        <NoClassFound />
      </Show>
      <Show when={klass}>
        <ClassStatsWithActions klass={klass} />
      </Show>

      <Tabs.Root
        orientation='horizontal'
        defaultValue='students'
        variant='enclosed'
      >
        <Tabs.List
          w='100%'
          flexFlow='row wrap'
          gap='0.5rem'
          css={{
            justifyContent: 'center',
            '@media (min-width: 420px)': {
              justifyContent: 'flex-start',
            },
          }}
        >
          <Tabs.Trigger value='students'>
            <LuUser />
            Students
          </Tabs.Trigger>
          <Tabs.Trigger value='teachers'>
            <FaChalkboardTeacher />
            Teachers
          </Tabs.Trigger>
          <Tabs.Trigger value='courses'>
            <LuSquareCheck />
            Courses
          </Tabs.Trigger>
          <Tabs.Indicator hideBelow='sm' rounded='l2' />
        </Tabs.List>
        <Tabs.Content overflowX='hidden' flexGrow={1} value='students'>
          <Show when={klass}>
            <ClassRoomUsersListCard klass={klass} role='student' />
          </Show>
        </Tabs.Content>
        <Tabs.Content overflowX='hidden' flexGrow={1} value='teachers'>
          <Show when={klass}>
            <ClassRoomUsersListCard klass={klass} role='teacher' />
          </Show>
        </Tabs.Content>
        <Tabs.Content overflowX='hidden' value='courses' flexGrow={1}>
          <Show when={klass}>
            <ClassRoomCoursesListCard klass={klass} />
          </Show>
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
}
