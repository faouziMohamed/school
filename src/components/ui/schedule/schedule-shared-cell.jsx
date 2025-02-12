import { adjustColorBrightness, stringToHexColors } from '@/lib/helpers/utils';
import {
  formatTime,
  shouldDisplayEndTime,
  shouldDisplayStartTime,
} from '@/lib/packages/schedules/schedules.utils';
import { Box, Tag, Text } from '@chakra-ui/react';
import { CgCornerDownLeft, CgCornerDownRight } from 'react-icons/cg';

/**
 * @param {Object} props
 * @param {number} props.currentHour
 * @param {boolean} props.inThe30MinSlot
 * @param {ScheduleData} props.schedule
 */
export function ScheduleSharedCell({ currentHour, inThe30MinSlot, schedule }) {
  const colors = stringToHexColors(schedule.courseName, 120);
  const { backgroundColor, foregroundColor } = colors;
  const borderColor = adjustColorBrightness(backgroundColor, -40);
  const tagStColor = stringToHexColors(schedule.courseName, -70);
  const { backgroundColor: stBg, foregroundColor: stFg } = tagStColor;

  const tagEndColor = stringToHexColors(schedule.courseName, -30);
  const { backgroundColor: endBg, foregroundColor: endFg } = tagEndColor;
  return (
    <Box
      p={2}
      bg={backgroundColor}
      borderWidth={1}
      borderColor={borderColor}
      borderRadius='md'
      flexGrow={1}
    >
      <Text fontSize='xs' fontWeight='medium' color={foregroundColor}>
        {schedule.courseName}
      </Text>
      <Text fontSize='xs' color='gray.600'>
        {schedule.teacherName}
      </Text>
      <Text fontSize='xs' color='gray.600'>
        {schedule.className}
      </Text>
      <Box pt={2}>
        {shouldDisplayStartTime(currentHour, schedule, inThe30MinSlot) && (
          <Tag.Root variant='subtle' css={{ bgColor: stBg, color: stFg }}>
            <Tag.StartElement>
              <CgCornerDownRight />
            </Tag.StartElement>
            <Tag.Label>{formatTime(schedule.startAt)}</Tag.Label>
          </Tag.Root>
        )}
        {shouldDisplayEndTime(currentHour, schedule, inThe30MinSlot) && (
          <Tag.Root variant='subtle' css={{ bgColor: endBg, color: endFg }}>
            <Tag.StartElement>
              <CgCornerDownLeft />
            </Tag.StartElement>
            <Tag.Label>{formatTime(schedule.endAt)}</Tag.Label>
          </Tag.Root>
        )}
      </Box>
    </Box>
  );
}
