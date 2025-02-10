import { ScheduleView } from '@/components/ui/schedule/schedule-view';
import { Card, Heading, Stack } from '@chakra-ui/react';

export const dynamic = 'force-dynamic';

export default function CoursesSchedulePage() {
  return (
    <Stack>
      <Card.Root>
        <Card.Body>
          <Heading size='lg'>Course Schedule</Heading>
        </Card.Body>
      </Card.Root>
      <ScheduleView />
    </Stack>
  );
}
