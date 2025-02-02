import { AllUsersListed } from '@/components/ui/classes/users/all-student-listed';
import { capitalize } from '@/lib/helpers/utils';
import {
  getStudentsByClassId,
  getTeachersByClassId,
} from '@/lib/packages/classes/classes.service';
import { Card, Heading } from '@chakra-ui/react';

/**
 * @param {object} props
 * @param {Classe} props.klass
 * @param {string} props.role
 */
export async function ClassRoomUsersListCard({ klass, role }) {
  const users =
    role === 'student'
      ? await getStudentsByClassId(klass)
      : await getTeachersByClassId(klass);

  return (
    <Card.Root w='100%'>
      <Card.Header justifyContent='space-between' flexDirection={{ sm: 'row' }}>
        <Heading size='md'>{capitalize(role)}s</Heading>
      </Card.Header>
      <Card.Body color='fg.muted'>
        <AllUsersListed users={users} role={role} />
      </Card.Body>
    </Card.Root>
  );
}
