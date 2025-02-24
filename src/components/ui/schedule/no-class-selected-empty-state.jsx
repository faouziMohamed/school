import { EmptyState } from '@/components/ui/empty-state';
import { Icon } from '@chakra-ui/react';
import { TbCalendar } from 'react-icons/tb';

export function NoClassSelectedEmptyState() {
  return (
    <EmptyState
      title='No class selected'
      description='Select a class from the list above to view its schedule'
      icon={
        <Icon fontSize='5rem' asChild>
          <TbCalendar />
        </Icon>
      }
    />
  );
}
