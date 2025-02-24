import { EmptyState } from '@/components/ui/empty-state';
import { Spinner } from '@chakra-ui/react';

export function LoadingSchedules() {
  return (
    <EmptyState
      title='Loading schedules...'
      size='lg'
      icon={<Spinner size='lg' color='blue' />}
    />
  );
}
