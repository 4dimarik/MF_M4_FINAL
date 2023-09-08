import { memo } from 'react';
import { Flex, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import notesService from '../../../services/notesService';
import { IAppState, IActiveNote } from '../../../context/AppProvider/models';
import { useAppState } from '../../../context/AppProvider';
import { useParams } from 'react-router-dom';
import { modals } from '@mantine/modals';
import { ModalsProvider } from '@mantine/modals';
import { useNavigate } from 'react-router-dom';
import { SearchBox } from './SearchBox';

const NoteActions = memo(function NoteActions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const appState: IAppState | null = useAppState();
  const { editable, setEditable } = appState?.activeNote as IActiveNote;

  const handleDelete = () => {
    if (id) notesService.delete(Number(id));
    appState?.setFirstNoteId(null);
    navigate('/');
  };

  const toggleNoteEditable = () => {
    setEditable(!editable);
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
        <SearchBox />
      </Flex>
    </ModalsProvider>
  );
});

export default NoteActions;
