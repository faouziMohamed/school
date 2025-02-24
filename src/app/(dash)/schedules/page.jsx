import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { ClassScheduleView } from '@/components/ui/schedule/class-schedule-view';
import { ROUTES } from '@/lib/routes/client.route';
import { Card, Heading, Stack } from '@chakra-ui/react';
import { redirect, RedirectType } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function CoursesSchedulePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    console.log(
      'No session found, the user is not logged in, redirecting to login page...',
    );
    const next = new URLSearchParams({ next: ROUTES.SCHEDULES });
    const urlWithNext = `${ROUTES.LOGIN}?${next.toString()}`;
    redirect(urlWithNext, RedirectType.replace);
  }
  const { role } = session;

  return (
    <Stack w='100%'>
      <Card.Root>
        <Card.Body>
          <Heading size='lg'>Course Schedule</Heading>
        </Card.Body>
      </Card.Root>
      <Suspense fallback='Loading...'>
        <ClassScheduleView role={role} />
      </Suspense>
    </Stack>
  );
}
