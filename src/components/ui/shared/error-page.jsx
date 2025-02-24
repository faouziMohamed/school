import { EmptyState } from '@/components/ui/empty-state';
import { Icon, Stack } from '@chakra-ui/react';
import { Lia500Px } from 'react-icons/lia';
import { TbError404 } from 'react-icons/tb';

/**
 * ErrorPageState
 * @param {Object} props
 * @param {'404'|'500'|404|500} [props.code=500]
 * @param {string} [props.title='Hmm, Something is not right!']
 * @param {string} [props.description]
 */
export function ErrorPageState({
  code = 500,
  title = 'Hmm, Something is not right!',
  description = 'Aïe, a strange thing happened and we are working on it!!',
}) {
  return (
    <EmptyState
      title={title}
      description={description}
      icon={
        <Icon fontSize='11rem' color='red'>
          {Number(code) === 404 ? <TbError404 /> : <Lia500Px />}
        </Icon>
      }
    />
  );
}

/**
 * ErrorPageState
 * @param {Object} props
 * @param {'404'|'500'|404|500} [props.code=500]
 * @param {string} [props.title='Hmm, Something is not right!']
 * @param {string} props.description
 */
export function ErrorPage({ code, title, description }) {
  return (
    <Stack
      h='100%'
      w='100%'
      alignItems='center'
      justifyContent='center'
      bgColor='red.50'
      boxShadow='md'
      rounded='lg'
      p='1rem'
    >
      <ErrorPageState code={code} title={title} description={description} />
    </Stack>
  );
}
