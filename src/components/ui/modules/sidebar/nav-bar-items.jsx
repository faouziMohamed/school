import { genSequence } from '@/lib/helpers/utils';
import { Icon } from '@chakra-ui/react';
import { CgEreader } from 'react-icons/cg';
import { GrSchedule } from 'react-icons/gr';
import { MdBook, MdHome, MdOutlineSettingsApplications } from 'react-icons/md';
import { PiReadCvLogoDuotone, PiUsersDuotone } from 'react-icons/pi';
import { SiGoogleclassroom } from 'react-icons/si';

const genId = genSequence();
/**
 * @typedef {Object} NavBarItems
 * @property {number} id
 * @property {string} name
 * @property {string} href
 * @property {string[]} permissions
 * @property {React.ReactNode} Icon
 * @property {string} description
 */

/**
 * @type {NavBarItems[]}
 */
export const navBarItems = [
  {
    id: genId(),
    name: 'Home',
    href: '/',
    permissions: ['admin', 'teacher', 'student'],
    Icon: <MdHome />,
    description: 'Home page',
  },
  {
    id: genId(),
    name: 'My Courses',
    href: '/my-courses',
    permissions: ['student', 'teacher'],
    Icon: <MdBook />,
    description: 'Manage The courses you are participating in',
  },
  {
    id: genId(),
    name: 'My Classes',
    href: '/my-classes',
    permissions: ['student', 'teacher'],
    Icon: <SiGoogleclassroom />,
    description: 'Manage The classes you are participating in',
  },
  {
    id: genId(),
    name: 'Class Rooms',
    href: '/class-rooms',
    permissions: ['admin'],
    Icon: <CgEreader />,
    description: 'Manage all classes and assign teachers',
  },
  {
    id: genId(),
    name: 'Course Catalog',
    href: '/course-catalog',
    permissions: ['teacher'],
    Icon: <PiReadCvLogoDuotone />,
    description: 'List of all available courses to join',
  },
  {
    id: genId(),
    name: 'Course Catalog',
    href: '/course-catalog',
    permissions: ['student', 'teacher', 'admin'],
    Icon: <PiReadCvLogoDuotone />,
    description: 'List of all available courses to join',
  },
  {
    id: genId(),
    name: 'Courses Schedule',
    href: '/courses-schedule',
    permissions: ['student', 'teacher', 'admin'],
    Icon: <GrSchedule />,
    description: 'View the schedule of all courses and classes',
  },
  {
    id: genId(),
    name: 'Users',
    href: '/users',
    permissions: ['admin'],
    Icon: <PiUsersDuotone />,
    description: 'Manage users and roles',
  },
  {
    id: genId(),
    name: 'Settings',
    href: '/settings',
    permissions: ['student', 'teacher', 'admin'],
    Icon: (
      <Icon fontSize={20} asChild>
        <MdOutlineSettingsApplications />
      </Icon>
    ),
    description: 'Manage your account settings',
  },
];
