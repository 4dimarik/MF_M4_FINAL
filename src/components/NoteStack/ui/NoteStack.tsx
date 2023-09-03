import { Navbar, Box, NavLink, Divider } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import notesService from '../../../services/notesService';
import { ActionResult } from '../../../services/notesService';
import NoteButton from './NoteButton';
import { useNavigate } from 'react-router-dom';
import { Note, db } from '../../../db';
import { useLiveQuery } from 'dexie-react-hooks';

export default function NoteStack() {
  const navigate = useNavigate();
  const notes: Note[] | undefined = useLiveQuery(() =>
    db.notes.orderBy('updatedAt').reverse().toArray()
  );

  const addNewNote = async () => {
    const result: ActionResult = await notesService.add();
    if (result.status === 'ok') navigate(`/${result.id}`);
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
        {notes && notes.map((note) => <NoteButton key={note.id} note={note} />)}
      </Box>
    </Navbar>
  );
}
