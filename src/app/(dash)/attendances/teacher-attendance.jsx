'use client';

import { Field, Input } from '@/components/ui/field';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';
import { toaster } from '@/components/ui/toaster';
import {
  Badge,
  Button,
  Flex,
  IconButton,
  NativeSelect,
  Stack,
  Table,
} from '@chakra-ui/react';
import { ChevronDown, Filter } from 'lucide-react';
import { useState } from 'react';

// Mock data - replace with API calls
const mockTeachers = [
  {
    id: 1,
    name: 'Dr. Smith',
    class: 'CM2',
    course: 'Mathematics',
    status: 'ATTEND',
  },
  {
    id: 2,
    name: 'Dr. Smith',
    class: 'Terminal',
    course: 'Logiciel',
    status: 'ATTEND',
  },
  // Add more mock data
];

const statusColors = {
  ATTEND: 'green',
  ABSENT: 'red',
  JUSTIFIED_ABSENCE: 'yellow',
};

export function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleStatusChange = (teacherId, newStatus) => {
    // Handle status update
    console.log({ teacherId, newStatus });
    toaster.success({
      title: 'Attendance updated',
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <Stack gap={4}>
      <Flex gap={4} flexWrap='wrap'>
        <Field maxW='200px' label='Classe'>
          <NativeSelect.Root size='sm'>
            <NativeSelect.Field
              placeholder='Select option'
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value='CM1'>CM1</option>
              <option value='CM2'>CM2</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field>

        <Field maxW='200px' label='Course'>
          <NativeSelect.Root size='sm'>
            <NativeSelect.Field
              placeholder='Select option'
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value='MATH'>Mathematics</option>
              <option value='ENG'>English</option>
              <option value='HIS'>History</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field>

        <Field label='Date'>
          <Input
            type='date'
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            css={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              borderWidth: '1px',
              width: '100%',
            }}
          />
        </Field>

        <IconButton aria-label='Filter' alignSelf='flex-end'>
          <Filter />
        </IconButton>
      </Flex>

      <Table.ScrollArea borderWidth='1px'>
        <Table.Root
          size='sm'
          variant='outline'
          showColumnBorder
          interactive
          stickyHeader
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Teacher Name</Table.ColumnHeader>
              <Table.ColumnHeader>Class</Table.ColumnHeader>
              <Table.ColumnHeader>Course</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {mockTeachers.map((teacher) => (
              <Table.Row key={teacher.id}>
                <Table.Cell>{teacher.name}</Table.Cell>
                <Table.Cell>{teacher.class}</Table.Cell>
                <Table.Cell>{teacher.course}</Table.Cell>
                <Table.Cell>
                  <Badge colorScheme={statusColors[teacher.status]}>
                    {teacher.status.replace('_', ' ')}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <MenuRoot>
                    <MenuTrigger asChild>
                      <Button variant='outline' size='sm'>
                        <ChevronDown />
                        Update Status
                      </Button>
                    </MenuTrigger>
                    <MenuContent>
                      <MenuItem
                        onClick={() => handleStatusChange(teacher.id, 'ATTEND')}
                      >
                        Present
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleStatusChange(teacher.id, 'ABSENT')}
                      >
                        Absent
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          handleStatusChange(teacher.id, 'JUSTIFIED_ABSENCE')
                        }
                      >
                        Justified Absence
                      </MenuItem>
                    </MenuContent>
                  </MenuRoot>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Stack>
  );
}
