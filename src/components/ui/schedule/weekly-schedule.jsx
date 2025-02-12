import { ScheduleCell } from '@/components/ui/schedule/schedule-cell';
import { ScheduleColumnHeaders } from '@/components/ui/schedule/schedule-column-headers';
import { currentTimeSlot } from '@/lib/packages/schedules/schedules.utils';
import { Box, For, Grid, GridItem, Stack, Text } from '@chakra-ui/react';

/**
 * @param {Object} props
 * @param {ScheduleData[]} props.scheduleData
 * @param {string[]} props.weekDays
 * @param {number[]} props.timeSlots
 * @param {Date} props.currentDate
 */
export function WeeklySchedule({
  scheduleData,
  weekDays,
  timeSlots,
  currentDate,
}) {
  console.log(currentDate);
  return (
    <Box overflowX='auto' w='100%'>
      <Box minW='800px' w='100%'>
        {/* Time slots column headers */}
        <ScheduleColumnHeaders weekDays={weekDays} />

        {/* Schedule grid */}
        <Stack gap={2} pt={4}>
          {timeSlots.map((timeSlot) => {
            const { currentHour, isInThe30MinSlot } = currentTimeSlot(timeSlot);
            const hour =
              Number(currentHour) < 10 ? `0${currentHour}` : currentHour;
            return (
              <Grid
                gap={2}
                key={timeSlot}
                templateColumns='100px repeat(6, 1fr)'
              >
                <GridItem>
                  <Text fontSize='sm' color='gray.600'>
                    {isInThe30MinSlot ? `${hour}:30` : `${hour}:00`}
                  </Text>
                </GridItem>
                <For each={weekDays}>
                  {(day, dayIndex) => (
                    <ScheduleCell
                      key={`${day}-${timeSlot}`}
                      scheduleData={scheduleData}
                      isInThe30MinSlot={isInThe30MinSlot}
                      currentHour={currentHour}
                      dayIndex={dayIndex}
                    />
                  )}
                </For>
              </Grid>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
