import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from '@/components/ui/radio-card';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { FaCalendar } from 'react-icons/fa';

/**
 * @typedef {Object} SchoolDayChoice
 * @property {'Monday'|'Tuesday'|'Wednesday'|'Thursday'|'Friday'|'Saturday'} title
 * @property {'monday'|'tuesday'|'wednesday'|'thursday'|'friday'|'saturday'} value
 * @property {JSX.Element} icon
 */
/**
 * @type {SchoolDayChoice[]}
 */
const items = [
  { value: 'monday', title: 'Monday', icon: <FaCalendar /> },
  { value: 'tuesday', title: 'Tuesday', icon: <FaCalendar /> },
  { value: 'wednesday', title: 'Wednesday', icon: <FaCalendar /> },
  { value: 'thursday', title: 'Thursday', icon: <FaCalendar /> },
  { value: 'friday', title: 'Friday', icon: <FaCalendar /> },
  { value: 'saturday', title: 'Saturday', icon: <FaCalendar /> },
];

export function SchoolDaysRadio({ onValueChange, value }) {
  return (
    <RadioCardRoot
      orientation='horizontal'
      align='center'
      justify='center'
      maxW='lg'
      defaultValue={items[0].value}
      onValueChange={onValueChange}
      value={value}
    >
      <RadioCardLabel fontWeight={600} fontSize='sm'>
        School days
      </RadioCardLabel>
      <Flex gap={2} flexWrap='wrap' align='stretch'>
        {items.map((item) => (
          <RadioCardItem
            colorPalette='blue'
            label={<Text fontWeight={600}>{item.title}</Text>}
            icon={
              <Icon
                fontSize='2xl'
                color={value === item.value ? 'blue.500' : 'fg.subtle'}
              >
                {item.icon}
              </Icon>
            }
            indicator={false}
            key={item.value}
            value={item.value}
          />
        ))}
      </Flex>
    </RadioCardRoot>
  );
}
