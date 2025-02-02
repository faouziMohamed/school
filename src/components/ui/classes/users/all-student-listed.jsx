import { Button } from '@/components/ui/button';
import { genSequence } from '@/lib/helpers/utils';
import { Table } from '@chakra-ui/react';
import Link from 'next/link';

/**
 *
 * @param {Object} props
 * @param {FrontUser[]} props.users
 * @param {string} props.role
 */
export function AllUsersListed({ users, role }) {
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
            <Table.ColumnHeader>First Name</Table.ColumnHeader>
            <Table.ColumnHeader>Last Name</Table.ColumnHeader>
            <Table.ColumnHeader textAlign='start'>email</Table.ColumnHeader>
            <Table.ColumnHeader textAlign='start'>
              Phone number
            </Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{genId()}</Table.Cell>
              <Table.Cell>{user.firstName}</Table.Cell>
              <Table.Cell>{user.lastName}</Table.Cell>
              <Table.Cell textAlign='center'>{user.email}</Table.Cell>
              <Table.Cell textAlign='center'>{user.phone}</Table.Cell>
              <Table.Cell>
                <Button colorPalette='blue' size='sm' asChild>
                  <Link href={`/${role}/${user.id}`}>View</Link>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
