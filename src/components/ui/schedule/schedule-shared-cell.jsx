import { adjustColorBrightness, stringToHexColors } from '@/lib/helpers/utils';
import {
  shouldDisplayEndTime,
  shouldDisplayStartTime,
} from '@/lib/packages/schedules/schedules.utils';
import { Box, Tag, Text } from '@chakra-ui/react';
import { CgCornerDownLeft, CgCornerDownRight } from 'react-icons/cg';

/**
 * @param {Object} props
 * @param {number} props.currentHour
 * @param {boolean} props.inThe30MinSlot
 * @param {FrontScheduleData} props.schedule
 */
export function ScheduleSharedCell({ currentHour, inThe30MinSlot, schedule }) {
  const colors = stringToHexColors(schedule.course.name, 120);
  const { backgroundColor, foregroundColor } = colors;
  const borderColor = adjustColorBrightness(backgroundColor, -40);
  const tagStColor = stringToHexColors(schedule.course.name, -70);
  const { backgroundColor: stBg, foregroundColor: stFg } = tagStColor;

  const tagEndColor = stringToHexColors(schedule.course.name, -30);
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
      <Text fontSize='1rem' fontWeight='medium' color={foregroundColor}>
        {schedule.course.name}
      </Text>
      <Text fontSize='0.88rem' color='gray.600'>
        {schedule.teacher.firstName} {schedule.teacher.lastName}
      </Text>
      <Text fontSize='0.88rem' color='gray.600'>
        {schedule.classe.name}
      </Text>
      <Box pt={2}>
        {shouldDisplayStartTime(currentHour, schedule, inThe30MinSlot) && (
          <Tag.Root variant='subtle' css={{ bgColor: stBg, color: stFg }}>
            <Tag.StartElement>
              <CgCornerDownRight />
            </Tag.StartElement>
            <Tag.Label>{schedule.startTime}</Tag.Label>
          </Tag.Root>
        )}
        {shouldDisplayEndTime(currentHour, schedule, inThe30MinSlot) && (
          <Tag.Root variant='subtle' css={{ bgColor: endBg, color: endFg }}>
            <Tag.StartElement>
              <CgCornerDownLeft />
            </Tag.StartElement>
            <Tag.Label>{schedule.startTime}</Tag.Label>
          </Tag.Root>
        )}
      </Box>
    </Box>
  );
}
