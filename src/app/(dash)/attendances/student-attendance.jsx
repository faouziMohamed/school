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
  Box,
  Button,
  Flex,
  IconButton,
  NativeSelect,
  Table,
} from '@chakra-ui/react';
import { ChevronDown, Filter } from 'lucide-react';
import { useState } from 'react';

// Mock data - replace with API calls
const mockStudents = [
  {
    id: 1,
    name: 'John Doe',
    class: 'CM2',
    course: 'Mathematics',
    status: 'ATTEND',
  },
  // Add more mock data
];

const statusColors = {
  ATTEND: 'green',
  ABSENT: 'red',
  JUSTIFIED_ABSENCE: 'yellow',
};

export function StudentAttendance() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleStatusChange = (studentId, newStatus) => {
    // Handle status update
    console.log({ studentId, newStatus });
    toaster.success({
      title: 'Attendance updated',
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <Box>
      <Flex gap={4} flexWrap='wrap'>
        <Field maxW='200px' label='Class'>
          <NativeSelect.Root size='sm'>
            <NativeSelect.Field
              placeholder='Select option'
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value='react'>React</option>
              <option value='vue'>Vue</option>
              <option value='angular'>Angular</option>
              <option value='svelte'>Svelte</option>
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
              <Table.ColumnHeader>Student Name</Table.ColumnHeader>
              <Table.ColumnHeader>Class</Table.ColumnHeader>
              <Table.ColumnHeader>Course</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {mockStudents.map((student) => (
              <Table.Row key={student.id}>
                <Table.Cell>{student.name}</Table.Cell>
                <Table.Cell>{student.class}</Table.Cell>
                <Table.Cell>{student.course}</Table.Cell>
                <Table.Cell>
                  {/*as keyof typeof statusColors*/}
                  <Badge colorScheme={statusColors[student.status]}>
                    {student.status.replace('_', ' ')}
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
                        onClick={() => handleStatusChange(student.id, 'ATTEND')}
                      >
                        Present
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleStatusChange(student.id, 'ABSENT')}
                      >
                        Absent
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          handleStatusChange(student.id, 'JUSTIFIED_ABSENCE')
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
    </Box>
  );
}
