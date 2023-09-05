import { memo } from 'react';
import { Header, Flex, Title } from '@mantine/core';
import { NoteActions } from './NoteAction';
import { UserMenu } from './UserMenu';

const HeaderBlock = memo(function HeaderBlock() {
  return (
    <Header height={60} p="xs">
      <Flex justify="space-between" p="0.5rem">
        <Title order={3}>React Notes</Title>
        <Flex justify="end">
          <NoteActions />
          <UserMenu />
        </Flex>
      </Flex>
    </Header>
  );
});

export { HeaderBlock };
