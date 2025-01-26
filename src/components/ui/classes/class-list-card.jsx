import { AddNewClassButton } from '@/components/ui/classes/add-new-class-button';
import { AllClassListed } from '@/components/ui/classes/all-class-listed';
import { Card, Heading } from '@chakra-ui/react';

export function ClassListCard({ classes }) {
  return (
    <Card.Root w='100%'>
      <Card.Header justifyContent='space-between' flexDirection={{ sm: 'row' }}>
        <Heading size='md'>Class Rooms</Heading>
        <AddNewClassButton />
      </Card.Header>
      <Card.Body color='fg.muted'>
        <AllClassListed classes={classes} />
      </Card.Body>
    </Card.Root>
  );
}
