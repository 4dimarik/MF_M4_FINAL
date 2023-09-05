import { memo } from 'react';
import { Flex, ActionIcon, TextInput } from '@mantine/core';
import { IconEdit, IconTrash, IconSearch } from '@tabler/icons-react';
import notesService from '../services/notesService';
import { IAppState, IActiveNote, ISearch } from '../context/AppProvider/models';
import { useAppState } from '../context/AppProvider';
import { useParams } from 'react-router-dom';
import { IChangeEventHandler } from '../models';
import { modals } from '@mantine/modals';
import { ModalsProvider } from '@mantine/modals';
import { useNavigate } from 'react-router-dom';

const NoteActions = memo(function NoteActions() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const openModal = () =>
    modals.openConfirmModal({
      title: 'Подтвердите удаление',
      labels: { confirm: 'Удалить', cancel: 'Cancel' },
      onConfirm: () => {
        handleDelete();
        navigate('/');
      },
    });

  return (
    <ModalsProvider>
      <Flex justify="space-between" mx="sm">
        <ActionIcon color="orange" onClick={toggleNoteEditable}>
          <IconEdit size="1.2rem" stroke={1.5} />
        </ActionIcon>
        <ActionIcon color="red" onClick={openModal}>
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
    </ModalsProvider>
  );
});

export default NoteActions;
