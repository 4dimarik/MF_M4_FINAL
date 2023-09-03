import { memo } from 'react';
import { Flex, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import notesService from '../services/notesService';
import { AppState, ActiveNote } from '../context/AppProvider/models';
import { useAppState } from '../context/AppProvider';
import { useParams } from 'react-router-dom';

const NoteActions = memo(function NoteActions() {
  const { id } = useParams();
  const appState: AppState | null = useAppState();
  const { editable, setEditable } = appState?.activeNote as ActiveNote;

  const handleDelete = () => {
    if (id) notesService.delete(Number(id));
  };

  const toggleNoteEditable = () => {
    setEditable(!editable);
  };

  return (
    <Flex w="2.6rem" justify="space-between" mx="sm">
      <ActionIcon color="orange" onClick={toggleNoteEditable}>
        <IconEdit size="1.2rem" stroke={1.5} />
      </ActionIcon>
      <ActionIcon color="red" onClick={handleDelete}>
        <IconTrash size="1.2rem" stroke={1.5} />
      </ActionIcon>
    </Flex>
  );
});

export default NoteActions;
