import { CreateNewStudentButton } from '@/components/ui/classes/create-new-student-button';
import { CreateNewTeacherButton } from '@/components/ui/classes/create-new-teacher-button';
import { Card, Heading, SimpleGrid } from '@chakra-ui/react';

/**
 *
 * @param {object} props
 * @param {Classe} props.klass
 */
export function ClassStatsWithActions({ klass }) {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap='0.5rem'>
      <Card.Root w='100%'>
        <Card.Header justifyContent='space-between' flexDirection='row'>
          <Heading>Student count </Heading>
          <CreateNewStudentButton klass={klass} />
        </Card.Header>
        <Card.Body py='1rem'>{klass._count.classStudent}</Card.Body>
      </Card.Root>
      <Card.Root w='100%'>
        <Card.Header justifyContent='space-between' flexDirection='row'>
          <Heading>Teachers count </Heading>
          <CreateNewTeacherButton klass={klass} />
        </Card.Header>
        <Card.Body py='1rem'>{klass._count.classTeacher}</Card.Body>
      </Card.Root>
      <Card.Root w='100%'>
        <Card.Header>
          <Heading>Course count </Heading>
        </Card.Header>
        <Card.Body py='1rem'>{klass._count.classCourse}</Card.Body>
      </Card.Root>
    </SimpleGrid>
  );
}
