'use client';

import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { WeeklySchedule } from './weekly-schedule';
import { AddScheduleModal } from '@/components/ui/schedule/add-schedule-modal';
import { LoadingSchedules } from '@/components/ui/schedule/loading-schedules';
import { NoClassSelectedEmptyState } from '@/components/ui/schedule/no-class-selected-empty-state';
import { SelectClassForScheduleView } from '@/components/ui/schedule/select-class-for-schedule-view';
import { useClassScheduleQuery } from '@/lib/packages/schedules/schedule.queries';
import { Box, createListCollection, Flex, Show, Tabs } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { SiGoogleclassroom } from 'react-icons/si';

const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
// time slots each 30minutes from 8AM to 7PM
// the same time should be repeated twice for each hour to represent the 30 minutes
const TIME_SLOTS = Array.from({ length: 32 }, (_, i) => i / 2 + 7); // 7 AM to 7 PM
const TABS = {
  class: 'class',
  // teacher: 'teacher',
  // student: 'student',
};

/**
 * @param {Object} props
 * @param {FrontUserClass[]} props.classes
 * @param {boolean} [props.isAdmin=false]
 */
export function ScheduleView({ classes = [] }) {
  const [value, setValue] = useState([]);
  const [klass, setKlass] = useState(null);
  const { data, isLoading } = useClassScheduleQuery({ classId: klass?.id });
  const classCollection = useMemo(
    /**
     * @returns {import('@chakra-ui/react').ListCollection<FrontUserClass>}
     */
    () => {
      return createListCollection({
        items: classes || [],
        itemToString: (item) => item.name,
        itemToValue: (item) => item.id,
      });
    },
    [classes],
  );
  return (
    <Box
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
          direction={{ base: 'column', sm: 'row' }}
          justify='space-between'
          align={{ base: 'stretch', sm: 'center' }}
          gap={4}
        >
          <Tabs.List>
            {Object.values(TABS).map((tab) => (
              <Tabs.Trigger value={tab} key={tab}>
                <Flex align='center' gap={2}>
                  <SiGoogleclassroom size='1.3rem' />
                  <Box>Class View</Box>
                </Flex>
              </Tabs.Trigger>
            ))}
            <Tabs.Indicator rounded='l2' />
          </Tabs.List>
          <Flex gap={2} flexWrap={{ base: 'wrap' }} align='center'>
            <SelectClassForScheduleView
              collection={classCollection}
              value={value}
              onValueChange={(e) => {
                const [v] = e.value;
                setValue(e.value);
                const found = classes.find((c) => c.id === v);
                setKlass(found);
              }}
            />
            <Show when={klass}>
              <AddScheduleModal klass={klass} />
            </Show>
          </Flex>
        </Flex>

        <Show
          when={klass && !isLoading}
          fallback={
            isLoading ? <LoadingSchedules /> : <NoClassSelectedEmptyState />
          }
        >
          {Object.values(TABS).map((tab) => (
            <Tabs.Content p={0} value={tab} key={tab}>
              <WeeklySchedule
                scheduleData={data}
                weekDays={WEEK_DAYS}
                timeSlots={TIME_SLOTS}
              />
            </Tabs.Content>
          ))}
        </Show>
      </Tabs.Root>
    </Box>
  );
}
