import {
  currentTimeSlot,
  getSchedule,
} from '@/lib/packages/schedules/schedules.utils';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';

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
  console.log('currentDate', currentDate);
  return (
    <Box overflowX='auto' w='100%'>
      <Box minW='800px' w='100%'>
        {/* Time slots column headers */}
        <Grid templateColumns='100px repeat(6, 1fr)' gap={2} mb={4} w='100%'>
          <GridItem>
            <Text fontSize='sm' fontWeight='medium' color='gray.600'>
              Time
            </Text>
          </GridItem>
          {weekDays.map((day) => (
            <GridItem key={day}>
              <Text fontSize='sm' fontWeight='medium' textAlign='center'>
                {day}
              </Text>
            </GridItem>
          ))}
        </Grid>

        {/* Schedule grid */}
        <Box>
          {timeSlots.map((timeSlot) => {
            const { currentHour, isInThe30MinSlot } = currentTimeSlot(timeSlot);
            const hour =
              Number(currentHour) < 10 ? `0${currentHour}` : currentHour;
            return (
              <Grid
                key={timeSlot}
                templateColumns='100px repeat(6, 1fr)'
                gap={2}
                mb={2}
              >
                <GridItem>
                  <Text fontSize='sm' color='gray.600'>
                    {isInThe30MinSlot ? `${hour}:30` : `${hour}:00`}
                  </Text>
                </GridItem>
                {weekDays.map((day, dayIndex) => {
                  const schedule = getSchedule({
                    scheduleData,
                    dayIndex,
                    currentHour,
                    isInThe30MinSlot,
                  });

                  return (
                    <GridItem
                      key={`${day}-${timeSlot}`}
                      position='relative'
                      minH='4rem'
                      borderWidth={1}
                      borderColor='gray.200'
                      borderRadius='md'
                    >
                      {schedule && (
                        <Box
                          // position='absolute'
                          inset={0}
                          p={2}
                          overflow='hidden'
                          bg='blue.50'
                          borderWidth={1}
                          borderColor='blue.200'
                          borderRadius='md'
                        >
                          <Text fontSize='xs' fontWeight='medium'>
                            {schedule.courseName}
                          </Text>
                          <Text fontSize='xs' color='gray.600'>
                            {schedule.teacherName}
                          </Text>
                          <Text fontSize='xs' color='gray.600'>
                            {schedule.className}
                          </Text>
                        </Box>
                      )}
                    </GridItem>
                  );
                })}
              </Grid>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
