'use client';
import { AllCoursesListed } from '@/components/ui/classes/courses/all-courses-listed';
import { Card, Heading } from '@chakra-ui/react';

/**
 * @param {object} props
 * @param {Classe} props.klass
 */
export function ClassRoomCoursesListCard({ klass }) {
  return (
    <Card.Root w='100%'>
      <Card.Header justifyContent='space-between' flexDirection={{ sm: 'row' }}>
        <Heading size='md'>Courses</Heading>
      </Card.Header>
      <Card.Body color='fg.muted'>
        <AllCoursesListed klass={klass} />
      </Card.Body>
    </Card.Root>
  );
}
