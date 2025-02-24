import { AddNewClassButton } from '@/components/ui/classes/add-new-class-button';
import { EmptyState } from '@/components/ui/empty-state';
import { ScheduleView } from '@/components/ui/schedule/schedule-view';
import { getAllClasses } from '@/lib/packages/classes/classes.service';
import { Box } from '@chakra-ui/react';
import { TbFreezeRow } from 'react-icons/tb';

/**
 * @param {Object} props
 * @param {FrontUserRole} props.role
 */
export async function ClassScheduleView({ role }) {
  const classes = await getAllClasses();
  if (classes.length === 0) {
    return (
      <Box
        w='100%'
        p={4}
        gap='1rem'
        bg='white'
        borderRadius='lg'
        boxShadow='sm'
        asChild
      >
        <EmptyState
          title='No classes available to display a schedule'
          description='Create a class to get started'
          icon={<TbFreezeRow size='11rem' />}
        >
          <AddNewClassButton />
        </EmptyState>
      </Box>
    );
  }
  return <ScheduleView classes={classes} isAdmin={role === 'admin'} />;
}
