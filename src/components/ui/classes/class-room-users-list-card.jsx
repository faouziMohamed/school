import { AllUsersListed } from '@/components/ui/classes/all-student-listed';
import prisma from '@/lib/db/prisma.orm';
import { capitalize } from '@/lib/helpers/utils';
import { adaptUserFromDb } from '@/lib/helpers/utils.server';
import { CLASS_STUDENTS_SELECT } from '@/lib/packages/students/student.constant';
import { CLASS_TEACHERS_SELECT } from '@/lib/packages/teachers/teacher.constant';
import { Card, Heading } from '@chakra-ui/react';

async function getStudentsByClassId(klass) {
  const students = await prisma.classStudent.findMany({
    where: { classId: klass.id },
    include: {
      student: { select: CLASS_STUDENTS_SELECT },
    },
  });
  return students.map((student) => adaptUserFromDb(student.student, 'student'));
}

async function getTeachersByClassId(klass) {
  const students = await prisma.classTeacher.findMany({
    where: { classId: klass.id },
    include: {
      teacher: { select: CLASS_TEACHERS_SELECT },
    },
  });
  return students.map((student) => adaptUserFromDb(student.teacher, 'teacher'));
}

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
  console.log('students', users);

  return (
    <Card.Root w='100%'>
      <Card.Header justifyContent='space-between' flexDirection={{ sm: 'row' }}>
        <Heading size='md'>{capitalize(role)}</Heading>
      </Card.Header>
      <Card.Body color='fg.muted'>
        <AllUsersListed users={users} role={role} />
      </Card.Body>
    </Card.Root>
  );
}
