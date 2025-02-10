import { Flex, IconButton, Text } from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

/**
 * @param {Object} props
 * @param {Date} props.currentDate
 * @param {() => void} props.onPreviousWeek
 * @param {() => void} props.onNextWeek
 */
export function CalendarHeader({ currentDate, onPreviousWeek, onNextWeek }) {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  /**
   * @param {Date} date
   */
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Flex align='center' gap={4}>
      <IconButton
        aria-label='Previous week'
        onClick={onPreviousWeek}
        variant='outline'
        size='sm'
        colorPalette='blue'
      >
        <LuChevronLeft />
      </IconButton>
      <Text fontSize='sm' fontWeight='medium'>
        {formatDate(startOfWeek)} - {formatDate(endOfWeek)}
      </Text>
      <IconButton
        aria-label='Next week'
        onClick={onNextWeek}
        variant='outline'
        size='sm'
        colorPalette='blue'
      >
        <LuChevronRight />
      </IconButton>
    </Flex>
  );
}
