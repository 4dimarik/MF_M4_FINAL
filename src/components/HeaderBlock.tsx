import { memo } from 'react';
import { Header, Flex } from '@mantine/core';
import NoteActions from './NoteActions';

const HeaderBlock = memo(function HeaderBlock() {
  return (
    <Header height={60} p="xs">
      <Flex bg="white" justify="end" p="0.5rem">
        <NoteActions />
      </Flex>
    </Header>
  );
});

export { HeaderBlock };
