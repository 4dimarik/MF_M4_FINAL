import { memo } from 'react';
import { Flex, ActionIcon, TextInput } from '@mantine/core';
import { IconEdit, IconTrash, IconSearch } from '@tabler/icons-react';
import notesService from '../services/notesService';
import { IAppState, IActiveNote, ISearch } from '../context/AppProvider/models';
import { useAppState } from '../context/AppProvider';
import { useParams } from 'react-router-dom';
import { IChangeEventHandler } from '../models';

const NoteActions = memo(function NoteActions() {
  const { id } = useParams();
  const appState: IAppState | null = useAppState();
  const { editable, setEditable } = appState?.activeNote as IActiveNote;
  const { value: search, setValue: setSearch } = appState?.search as ISearch;

  const handleDelete = () => {
    if (id) notesService.delete(Number(id));
  };

  const toggleNoteEditable = () => {
    setEditable(!editable);
  };

  const handleChangeSearch: IChangeEventHandler = (event) => {
    setSearch(event.currentTarget.value);
  };

  return (
    <Flex justify="space-between" mx="sm">
      <ActionIcon color="orange" onClick={toggleNoteEditable}>
        <IconEdit size="1.2rem" stroke={1.5} />
      </ActionIcon>
      <ActionIcon color="red" onClick={handleDelete}>
        <IconTrash size="1.2rem" stroke={1.5} />
      </ActionIcon>
      <TextInput
        placeholder="Поиск"
        icon={<IconSearch size="0.8rem" />}
        size="xs"
        ml="sm"
        value={search}
        onChange={handleChangeSearch}
      />
    </Flex>
  );
});

export default NoteActions;
