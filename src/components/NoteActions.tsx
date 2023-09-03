import { memo } from 'react';
import { Flex, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import notesService from '../services/notesService';

type Props = {
  id: number | undefined;
};

const NoteActions = memo(function NoteActions({ id }: Props) {
  const handleDelete = () => {
    console.log('DELETE', id);
    if (typeof id === 'number') notesService.delete(id);
  };
  console.log(id);
  return (
    <Flex w="2.6rem" justify="space-between" mr={4}>
      <ActionIcon color="orange">
        <IconEdit size="1rem" stroke={1.5} />
      </ActionIcon>
      <ActionIcon color="red" onClick={handleDelete}>
        <IconTrash size="1rem" stroke={1.5} />
      </ActionIcon>
    </Flex>
  );
});

export default NoteActions;
