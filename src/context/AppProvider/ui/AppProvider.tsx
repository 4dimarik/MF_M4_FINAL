import { createContext, useEffect, useState } from 'react';
import { ActiveNoteId, AppState, Props, ActiveNote } from '../models';
import { db } from '../../../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Note } from '../../../db';
import { redirect } from 'react-router-dom';

const AppContext = createContext<AppState | null>(null);

function AppProvider({ children }: Props) {
  const [activeNoteId, setActiveNoteId] = useState<ActiveNoteId>(null);
  // const [note, setNote] = useState<Note | undefined>(undefined);
  const notes: Note[] | undefined = useLiveQuery(() =>
    db.notes.orderBy('updatedAt').reverse().toArray()
  );

  // useEffect(() => {
  //   if (activeNoteId) setNote(notes?.find((note) => activeNoteId === note.id));
  // }, [notes, activeNoteId]);

  useEffect(() => {
    console.log(notes);
    if (activeNoteId === null && notes && notes?.length > 0) {
      console.log('#####1111111111');
      const id: number | null = notes[0].id ?? null;
      setActiveNoteId(id);
    }
  }, [notes]);

  const value: AppState | null = {
    activeNote: {
      id: activeNoteId,
      setId: setActiveNoteId,
    } as ActiveNote,
    notes: notes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
