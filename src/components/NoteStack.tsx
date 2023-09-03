import { Navbar, Box, NavLink, Divider } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useAppState } from '../context/AppProvider/hooks/useAppState';
import notesService from '../services/notesService';
import { ActionResult } from '../services/notesService';
import { AppState } from '../context/AppProvider/models';
import NoteActions from './NoteActions';
import moment from 'moment';
import { NoteDTView } from './NoteDTView';

export default function NoteStack() {
  const { activeNote, notes } = useAppState() as AppState;

  const addNewNote = async () => {
    const result: ActionResult = await notesService.add();
    if (
      result.status === 'ok' &&
      activeNote?.setId !== undefined &&
      typeof result.id === 'number'
    ) {
      console.log('###########123');
      activeNote.setId(result.id);
    }
    console.log('#### Add New', activeNote);
  };

  return (
    <Navbar width={{ base: 300 }} height="100vh" p="xs">
      <Box w="100%">
        <NavLink
          label="Новая заметка"
          icon={<IconPlus size="1rem" stroke={1.5} />}
          onClick={() => addNewNote()}
        />
        <Divider my="sm" />
        {notes &&
          notes.map((note) => (
            <NavLink
              key={note.id}
              component="div"
              label={note.title}
              description={<NoteDTView dt={note.updatedAt} />}
              rightSection={<NoteActions id={note.id} />}
              active={activeNote.id === note.id}
              // sx={
              //   test
              //     ? { '& .mantine-NavLink-label': { fontWeight: 'bold' } }
              //     : { cursor: 'auto' }
              // }
            />
          ))}
      </Box>
    </Navbar>
  );
}
