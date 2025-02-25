import { StudentAttendance } from './student-attendance';
import { TeacherAttendance } from '@/app/(dash)/attendances/teacher-attendance';
import { Card, Container, Heading, Tabs } from '@chakra-ui/react';

export default function AttendancePage() {
  return (
    <Card.Root w='100%'>
      <Card.Body color='fg.muted'>
        <Container maxW='container.xl' py={6}>
          <Heading>Attendance Management</Heading>
          <Tabs.Root
            variant='outline'
            colorPalette='blue'
            gap='1rem'
            defaultValue='students'
          >
            <Tabs.List>
              <Tabs.Trigger value='students'>Student Attendance</Tabs.Trigger>
              <Tabs.Trigger value='teachers'>Teacher Attendance</Tabs.Trigger>
              <Tabs.Indicator rounded='l2' />
            </Tabs.List>
            <Tabs.Content value='students'>
              <StudentAttendance />
            </Tabs.Content>
            <Tabs.Content value='teachers'>
              <TeacherAttendance />
            </Tabs.Content>
          </Tabs.Root>
        </Container>
      </Card.Body>
    </Card.Root>
  );
}
