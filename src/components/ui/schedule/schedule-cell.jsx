import { ScheduleSharedCell } from '@/components/ui/schedule/schedule-shared-cell';
import { getSchedules } from '@/lib/packages/schedules/schedules.utils';
import { GridItem, Stack } from '@chakra-ui/react';

/**
 * @param {Object} props
 * @param {ScheduleData[]} props.scheduleData
 * @param {boolean} props.isInThe30MinSlot
 * @param {number} props.currentHour
 * @param {number} props.dayIndex
 */
export function ScheduleCell({
  scheduleData,
  isInThe30MinSlot,
  currentHour,
  dayIndex,
}) {
  const schedules = getSchedules({
    scheduleData,
    dayIndex,
    currentHour,
    isInThe30MinSlot,
  });

  return (
    <GridItem
      position='relative'
      minH='4rem'
      borderWidth={1}
      borderColor='gray.200'
      borderRadius='md'
      asChild
    >
      <Stack gap={1} flexGrow={1}>
        {schedules.map((schedule) => (
          <ScheduleSharedCell
            key={schedule.id}
            schedule={schedule}
            currentHour={currentHour}
            inThe30MinSlot={isInThe30MinSlot}
          />
        ))}
      </Stack>
    </GridItem>
  );
}
