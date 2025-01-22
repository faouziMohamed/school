import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from '@/components/ui/radio-card';
import { HStack, Icon } from '@chakra-ui/react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { PiStudentFill } from 'react-icons/pi';

/**
 * @typedef {Object} UserChoice
 * @property {"Student"|"Teacher"} title
 * @property {"student"|"teacher"} value
 * @property {JSX.Element} icon
 */
/**
 * @type {UserChoice[]}
 */
const items = [
  { value: 'student', title: 'Student', icon: <PiStudentFill /> },
  { value: 'teacher', title: 'Teacher', icon: <FaChalkboardTeacher /> },
];

export function AccountTypeRadio({ onValueChange, value }) {
  return (
    <RadioCardRoot
      orientation='horizontal'
      align='center'
      justify='center'
      maxW='lg'
      defaultValue='student'
      onValueChange={onValueChange}
      value={value}
    >
      <RadioCardLabel fontWeight={600} fontSize='sm'>
        Account type
      </RadioCardLabel>
      <HStack align='stretch'>
        {items.map((item) => (
          <RadioCardItem
            label={item.title}
            icon={
              <Icon fontSize='2xl' color='fg.subtle'>
                {item.icon}
              </Icon>
            }
            indicator={undefined}
            key={item.value}
            value={item.value}
          />
        ))}
      </HStack>
    </RadioCardRoot>
  );
}
