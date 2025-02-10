'use client';

import { CalendarHeader } from './calendar-header';
import { WeeklySchedule } from './weekly-schedule';
import { Box, Flex, Stack, Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { PiStudentFill } from 'react-icons/pi';
import { SiGoogleclassroom } from 'react-icons/si';

const mockScheduleData = [
  {
    id: '1',
    courseId: 'MATH101',
    courseName: 'Mathematics',
    startAt: '2024-02-02T08:30:00',
    endAt: '2024-02-02T11:40:00',
    teacherName: 'Dr. Smith',
    className: 'Terminal S',
  },
  {
    id: '2',
    courseId: 'ENG101',
    courseName: 'English',
    startAt: '2024-02-01T09:15:00',
    endAt: '2024-02-01T12:30:00',
    teacherName: 'Dr. Faouzi',
    className: 'CM2',
  },
  {
    id: '3',
    courseId: 'PHYS101',
    courseName: 'Physics',
    startAt: '2024-01-31T14:30:00',
    endAt: '2024-01-31T16:00:00',
    teacherName: 'Dr. Faouzi',
    className: 'CM2',
  },
  {
    id: '3',
    courseId: 'TECH101',
    courseName: 'Technology',
    startAt: '2024-01-29T12:30:00',
    endAt: '2024-01-29T15:15:00',
    teacherName: 'Prof. John',
    className: 'Terminal S',
  },
];

const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
// const TIME_SLOTS = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
// time slots each 30minutes from 8AM to 7PM
// the same time should be repeated twice for each hour to represent the 30 minutes
const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => i / 2 + 8); // 8 AM to 7 PM
const TABS = {
  class: 'class',
  teacher: 'teacher',
  student: 'student',
};

export function ScheduleView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <Stack
      w='100%'
      p={4}
      gap='1rem'
      bg='white'
      borderRadius='lg'
      boxShadow='sm'
      asChild
    >
      <Tabs.Root
        variant='outline'
        colorPalette='blue'
        defaultValue={TABS.class}
        gap='1rem'
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align={{ base: 'stretch', md: 'center' }}
          gap={4}
        >
          <Tabs.List>
            <Tabs.Trigger value={TABS.class}>
              <Flex align='center' gap={2}>
                <SiGoogleclassroom size='1.3rem' />
                <Box>Class View</Box>
              </Flex>
            </Tabs.Trigger>
            <Tabs.Trigger value={TABS.teacher}>
              <Flex align='center' gap={2}>
                <FaChalkboardTeacher size='1.3rem' />
                <Box>Teacher View</Box>
              </Flex>
            </Tabs.Trigger>
            <Tabs.Trigger value={TABS.student}>
              <Flex align='center' gap={2}>
                <PiStudentFill size='1.3rem' />
                <Box>Student View</Box>
              </Flex>
            </Tabs.Trigger>
            <Tabs.Indicator rounded='l2' />
          </Tabs.List>

          <CalendarHeader
            currentDate={currentDate}
            onPreviousWeek={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(currentDate.getDate() - 7);
              setCurrentDate(newDate);
            }}
            onNextWeek={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(currentDate.getDate() + 7);
              setCurrentDate(newDate);
            }}
          />
        </Flex>

        <Tabs.Content p={0} value={TABS.class}>
          <WeeklySchedule
            scheduleData={mockScheduleData}
            weekDays={WEEK_DAYS}
            timeSlots={TIME_SLOTS}
            currentDate={currentDate}
          />
        </Tabs.Content>
        <Tabs.Content p={0} value={TABS.teacher}>
          <WeeklySchedule
            scheduleData={mockScheduleData}
            weekDays={WEEK_DAYS}
            timeSlots={TIME_SLOTS}
            currentDate={currentDate}
          />
        </Tabs.Content>
        <Tabs.Content p={0} value={TABS.student}>
          <WeeklySchedule
            scheduleData={mockScheduleData}
            weekDays={WEEK_DAYS}
            timeSlots={TIME_SLOTS}
            currentDate={currentDate}
          />
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
}
