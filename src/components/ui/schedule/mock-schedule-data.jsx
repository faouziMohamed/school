import { genSequence } from '@/lib/helpers/utils';

const genId = genSequence();
export const mockScheduleData = [
  {
    id: genId(),
    courseId: 'MATH101',
    courseName: 'Mathematics',
    startAt: '2024-02-02T08:30:00',
    endAt: '2024-02-02T11:40:00',
    teacherName: 'Dr. Smith',
    className: 'Terminal S',
  },
  {
    id: genId(),
    courseId: 'ENG101',
    courseName: 'English',
    startAt: '2024-02-01T09:15:00',
    endAt: '2024-02-01T12:30:00',
    teacherName: 'Dr. Faouzi',
    className: 'CM2',
  },
  {
    id: genId(),
    courseId: 'PHYS101',
    courseName: 'Physics',
    startAt: '2024-01-31T14:30:00',
    endAt: '2024-01-31T16:25:00',
    teacherName: 'Dr. Faouzi',
    className: 'CM2',
  },
  {
    id: genId(),
    courseId: 'TECH101',
    courseName: 'Technology',
    startAt: '2024-01-29T12:30:00',
    endAt: '2024-01-29T15:55:00',
    teacherName: 'Prof. John',
    className: 'Terminal S',
  },
  {
    id: genId(),
    courseId: 'BIO101',
    courseName: 'Biology',
    startAt: '2024-01-30T10:40:00',
    endAt: '2024-01-30T12:30:00',
    teacherName: 'Dr. Faouzi',
    className: 'CM2',
  },
  {
    id: genId(),
    courseId: 'HIST101',
    courseName: 'History',
    startAt: '2024-01-30T08:30:00',
    endAt: '2024-01-30T13:40:00',
    teacherName: 'Dr. Smith',
    className: 'Terminal S',
  },
  {
    id: genId(),
    courseId: 'CHEM101',
    courseName: 'Chemistry',
    startAt: '2024-01-30T14:30:00',
    endAt: '2024-01-30T16:25:00',
    teacherName: 'Dr. Faouzi',
    className: 'CM2',
  },
  {
    id: genId(),
    courseId: 'GEO101',
    courseName: 'Geography',
    startAt: '2024-01-29T12:30:00',
    endAt: '2024-01-29T15:55:00',
    teacherName: 'Prof. John',
    className: 'Terminal S',
  },
];
