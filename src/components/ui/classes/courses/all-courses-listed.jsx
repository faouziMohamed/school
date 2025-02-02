import { Button } from '@/components/ui/button';
import { genSequence } from '@/lib/helpers/utils';
import { Table } from '@chakra-ui/react';
import Link from 'next/link';

/**
 *
 * @param {Object} props
 * @param {Course[]} props.courses
 */
export function AllCoursesListed({ courses }) {
  const genId = genSequence(1);
  return (
    <Table.ScrollArea borderWidth='1px'>
      <Table.Root
        size='sm'
        px='1rem'
        variant='outline'
        interactive
        stickyHeader
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>#</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader textAlign='end'>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {courses.map((course) => (
            <Table.Row key={course.id}>
              <Table.Cell>{genId()}</Table.Cell>
              <Table.Cell>{course.name}</Table.Cell>
              <Table.Cell>{course.description}</Table.Cell>
              <Table.Cell textAlign='end'>
                <Button colorPalette='blue' size='sm' asChild>
                  <Link href={`/courses/${course.slug}`}>View</Link>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
