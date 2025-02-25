import { AppSessionProvider } from '@/components/theme/app-session-provider';
import { LeftSideBar } from '@/components/ui/modules/sidebar/left-side-bar';
import { Flex, Stack } from '@chakra-ui/react';

export const metadata = {
  title: 'School Management System',
};

export default function RootLayout({ children }) {
  return (
    <AppSessionProvider>
      <Flex
        position='absolute'
        inset={0}
        w='100%'
        h='100%'
        bg='gray.300'
        overflow='hidden'
        fontSize='lg'
      >
        <LeftSideBar />
        <Stack
          as='main'
          flexGrow={1}
          py='2rem'
          px={{ base: '0.5rem', sm: '1rem' }}
          fontFamily='var(--font-tertiary)'
          overflowY='auto'
        >
          {children}
        </Stack>
      </Flex>
    </AppSessionProvider>
  );
}
