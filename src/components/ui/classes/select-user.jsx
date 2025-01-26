'use client';
import { useAddUserToClass } from '@/components/ui/classes/use-add-user-to-class';
import { Field, Input } from '@/components/ui/field';
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover';
import { capitalize } from '@/lib/helpers/utils';
import {
  Box,
  Button,
  Flex,
  For,
  Heading,
  Icon,
  List,
  Show,
  Stack,
  Text,
} from '@chakra-ui/react';
import { SiGoogleclassroom } from 'react-icons/si';

/**
 *
 * @param {object} props
 * @param {() => void} props.onClose
 * @param {Classe} props.klass
 * @param {FrontUserRole} props.role
 */
export function SelectUser({ onClose, klass, role }) {
  const hook = useAddUserToClass(onClose, klass, role);
  const { open, setOpen, ref, handleSearch, users, onAddUserToClass } = hook;
  const { selectedUser, setSelectedUser, submitting } = hook;
  return (
    <Stack>
      <Show when={!!selectedUser}>
        <Flex shadow='md' bgColor='blue.50' px='1rem' py='0.5rem'>
          <SelectedUser selectedUser={selectedUser} />
          <Button
            flexBasis='30%'
            flexShrink={0}
            colorPalette='blue'
            onClick={onAddUserToClass}
            spinnerPlacement='end'
            loadingText='Adding to class...'
            disabled={submitting}
          >
            Add to class
          </Button>
        </Flex>
      </Show>
      <Heading size='sm'></Heading>
      <PopoverRoot
        open={open && users?.length > 0}
        onOpenChange={(e) => setOpen(e.open)}
        positioning={{ sameWidth: true, placement: 'bottom' }}
        initialFocusEl={() => ref.current}
      >
        <PopoverTrigger asChild>
          <Field label={`Search for a ${role}`}>
            <Input
              ref={ref}
              onChange={async (e) => {
                await handleSearch(e.target.value);
              }}
            />
          </Field>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody p='0.5rem'>
            <List.Root variant='plain' gap='0.5rem'>
              <List.Item
                flexDirection='column'
                rounded='sm'
                py='0.4rem'
                px='0.5rem'
                fontSize='xs'
              >
                <Box>📚 - {capitalize(role)} has no classes Yet</Box>
                <Box>📖 - {capitalize(role)} has classes</Box>
              </List.Item>
              <For each={users}>
                {(user) => (
                  <SelectableUser
                    key={user.id}
                    onClick={() => {
                      setSelectedUser(user);
                      setOpen(false);
                    }}
                    user={user}
                  />
                )}
              </For>
            </List.Root>
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    </Stack>
  );
}

/**
 * @param {object} props
 * @param {FrontUser} props.user
 * @param {() => void} props.onClick
 */
function SelectableUser({ onClick, user }) {
  return (
    <Button
      variant='subtle'
      justifyContent='flex-start'
      alignItems='flex-start'
      py='0.5rem'
      asChild
      minH='none'
      height='auto'
      onClick={onClick}
    >
      <List.Item>
        <List.Indicator>
          <Show when={!!user?.classes?.length}>
            <Text
              as='span'
              fontFamilly='var(--font-secondary)'
              color='fg.muted'
              display='inline'
              fontSize='xs'
            >
              {user.classes?.length}
            </Text>{' '}
          </Show>
          {user?.classes?.length > 0 ? '📖' : '📚'}
        </List.Indicator>
        <Stack gap={0} justifyContent='flex-start'>
          <Heading size='sm' p={0}>
            {user.firstName} {user.lastName}
          </Heading>
          <Text color='fg.muted'>{user.email}</Text>
        </Stack>
      </List.Item>
    </Button>
  );
}

/**
 * @param {object} props
 * @param {FrontUser} props.selectedUser
 */
function SelectedUser({ selectedUser }) {
  return (
    <Stack flexGrow={1}>
      <Stack gap={0} justifyContent='flex-start'>
        <Heading size='sm' p={0}>
          {selectedUser.firstName} {selectedUser.lastName}
        </Heading>
        <Text color='fg.muted'>{selectedUser.email}</Text>
      </Stack>
      <Show when={selectedUser.classes}>
        <Stack
          color='fg.muted'
          flexDirection='row'
          gap='0.5rem'
          aligmItems='center'
        >
          <Icon fontSize='1.5em'>
            <SiGoogleclassroom />
          </Icon>
          <Box as='span'>
            {selectedUser.classes.map((klass) => klass.name).join('|')}
          </Box>
        </Stack>
      </Show>
    </Stack>
  );
}
