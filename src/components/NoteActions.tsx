import { memo } from 'react';
import { Flex, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import notesService from '../services/notesService';
import { AppState, ActiveNote } from '../context/AppProvider/models';
import { useAppState } from '../context/AppProvider';

type Props = {
  id: number | undefined;
};

const NoteActions = memo(function NoteActions({ id }: Props) {
  const appState: AppState | null = useAppState();
  const { editable, setEditable } = appState?.activeNote as ActiveNote;

  const handleDelete = () => {
    if (typeof id === 'number') notesService.delete(id);
  };

  const toggleNoteEditable = () => {
    setEditable(!editable);
  };

  return (
    <Flex w="2.6rem" justify="space-between" mr={4}>
      <ActionIcon color="orange" onClick={toggleNoteEditable}>
        <IconEdit size="1rem" stroke={1.5} />
      </ActionIcon>
      <ActionIcon color="red" onClick={handleDelete}>
        <IconTrash size="1rem" stroke={1.5} />
      </ActionIcon>
    </Flex>
  );
});

export default NoteActions;
