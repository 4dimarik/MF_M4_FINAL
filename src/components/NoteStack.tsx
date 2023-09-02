import { Navbar, Box, NavLink, Divider } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useAppState } from '../context/AppProvider/hooks/useAppState';
import notesService from '../services/notesService';
import { AddNoteResult } from '../services/notesService';
import { AppState } from '../context/AppProvider/models';
import NoteActions from './NoteActions';

export default function NoteStack() {
  const { activeNote, notes } = useAppState() as AppState;
  console.log(notes);

  const addNewNote = async () => {
    const result: AddNoteResult = await notesService.add();
    if (
      result.status === 'ok' &&
      activeNote?.set !== undefined &&
      typeof result.id === 'number'
    ) {
      activeNote.set(result.id);
    }
    console.log(activeNote);
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
              description="Additional information"
              rightSection={<NoteActions id={note.id} />}
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
