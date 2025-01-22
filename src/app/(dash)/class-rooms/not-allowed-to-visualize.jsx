'use client';
import { EmptyState } from '@/components/ui/empty-state';
import { MdOutlineSecurity } from 'react-icons/md';

export function NotAllowedToVisualize() {
  return (
    <EmptyState
      title='Hmm, Something is not right!'
      description='You cannot actually visualize this page'
      icon={<MdOutlineSecurity />}
    />
  );
}
