import { Navbar, Box, NavLink, Divider } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import notesService from '../../../services/notesService';
import { ActionResult } from '../../../services/notesService';
import NoteButton from './NoteButton';
import { useNavigate } from 'react-router-dom';
import { Note } from '../../../db';
import {
  IAppState,
  ISearch,
  IActiveNote,
} from '../../../context/AppProvider/models';
import { useAppState } from '../../../context/AppProvider';
import { useEffect } from 'react';

export default function NoteStack() {
  const navigate = useNavigate();
  const appState: IAppState | null = useAppState();
  const { value: search } = appState?.search as ISearch;
  const { setEditable } = appState?.activeNote as IActiveNote;
  const notes: Note[] | undefined = appState?.notes;

  const addNewNote = async () => {
    const result: ActionResult = await notesService.add();
    if (result.status === 'ok') {
      navigate(`/note/${result.id}`);
      setEditable(true);
    }
  };

  useEffect(() => {
    if (search !== '' && notes) {
      if (notes.length === 0) {
        navigate('/note/notfound');
      } else {
        navigate(`/note/${notes[0].id}`);
      }
    }
  }, [search, notes]);

  return (
    <Navbar width={{ base: 300 }} height="100vh" p="xs">
      <Box w="100%">
        <NavLink
          label="Новая заметка"
          icon={<IconPlus size="1rem" stroke={1.5} />}
          onClick={() => addNewNote()}
        />
        <Divider my="sm" />
        {notes && notes.map((note) => <NoteButton key={note.id} note={note} />)}
      </Box>
    </Navbar>
  );
}
