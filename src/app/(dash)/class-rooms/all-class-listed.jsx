import { genSequence } from '@/lib/helpers/utils';
import { Table } from '@chakra-ui/react';

export function AllClassListed({ classes }) {
  const genId = genSequence(1);
  return (
    <Table.ScrollArea borderWidth='1px'>
      <Table.Root size='sm' variant='outline'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>#</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader textAlign='end'>Description</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {classes.map((klass) => (
            <Table.Row key={klass.id}>
              <Table.Cell>{genId()}</Table.Cell>
              <Table.Cell>{klass.name}</Table.Cell>
              <Table.Cell textAlign='end'>{klass.description}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
