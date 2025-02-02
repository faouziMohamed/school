import { AllCoursesListed } from '@/components/ui/classes/courses/all-courses-listed';
import { getCoursesByClassId } from '@/lib/packages/classes/classes.service';
import { Card, Heading } from '@chakra-ui/react';

/**
 * @param {object} props
 * @param {Classe} props.klass
 */
export async function ClassRoomCoursesListCard({ klass }) {
  const courses = await getCoursesByClassId(klass);

  return (
    <Card.Root w='100%'>
      <Card.Header justifyContent='space-between' flexDirection={{ sm: 'row' }}>
        <Heading size='md'>Courses</Heading>
      </Card.Header>
      <Card.Body color='fg.muted'>
        <AllCoursesListed courses={courses} />
      </Card.Body>
    </Card.Root>
  );
}
