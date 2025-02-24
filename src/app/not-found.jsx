import { ErrorPage } from '@/components/ui/shared/error-page';
import { AbsoluteCenter } from '@chakra-ui/react';

export default function NotFoundError() {
  return (
    <AbsoluteCenter w='100%' h='100%'>
      <ErrorPage
        code={404}
        title='Hmm, You reached a dead end!'
        description='The class you are looking for does not exist'
      />
    </AbsoluteCenter>
  );
}
