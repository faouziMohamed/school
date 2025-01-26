'use client';
import { EmptyState } from '@/components/ui/empty-state';
import { Icon } from '@chakra-ui/react';
import { MdOutlineSecurity } from 'react-icons/md';
import { TbError404 } from 'react-icons/tb';

export function NotAllowedToVisualize() {
  return (
    <EmptyState
      title='Hmm, Something is not right!'
      description='You cannot actually visualize this page'
      icon={<MdOutlineSecurity />}
    />
  );
}

export function NotFoundPageState() {
  return (
    <EmptyState
      title='Hmm, You reached a dead end!'
      description='The class you are looking for does not exist'
      icon={
        <Icon fontSize='10rem' color='red'>
          <TbError404 />
        </Icon>
      }
    />
  );
}

export function NoClassFound() {
  return (
    <EmptyState
      title='Hmm, No classes found'
      description='Create a class to get started'
      icon={
        <Icon fontSize='10rem' color='red'>
          <TbError404 />
        </Icon>
      }
    />
  );
}
