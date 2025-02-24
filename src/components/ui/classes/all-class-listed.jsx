import { Button } from '@/components/ui/button';
import { genSequence } from '@/lib/helpers/utils';
import { Table } from '@chakra-ui/react';
import Link from 'next/link';

/**
 *
 * @param {Object} props
 * @param {Classe[]} props.classes
 */
export async function AllClassListed({ classes }) {
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
            <Table.ColumnHeader textAlign='start'>
              # Teachers
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign='start'>
              # Students
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign='start'># Courses</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {classes.map((klass) => (
            <Table.Row key={klass.id}>
              <Table.Cell>{genId()}</Table.Cell>
              <Table.Cell>{klass.name}</Table.Cell>
              <Table.Cell>{klass.description}</Table.Cell>
              <Table.Cell textAlign='center'>{klass.stats.teachers}</Table.Cell>
              <Table.Cell textAlign='center'>{klass.stats.students}</Table.Cell>
              <Table.Cell textAlign='center'>{klass.stats.courses}</Table.Cell>
              <Table.Cell>
                <Button colorPalette='blue' size='sm' asChild>
                  <Link href={`/class-rooms/${klass.slug}`}>View</Link>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
