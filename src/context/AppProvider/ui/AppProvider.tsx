import { createContext, useEffect, useState } from 'react';
import { ActiveNoteId, AppState, Props, ActiveNote } from '../models';
import { db } from '../../../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Note } from '../../../db';

const AppContext = createContext<AppState | null>(null);

function AppProvider({ children }: Props) {
  const [activeNoteId, setActiveNoteId] = useState<ActiveNoteId>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const notes: Note[] | undefined = useLiveQuery(() =>
    db.notes.orderBy('updatedAt').reverse().toArray()
  );

  useEffect(() => {
    console.log(notes);
    if (activeNoteId === null && notes && notes?.length > 0) {
      const id: number | null = notes[0].id ?? null;
      setActiveNoteId(id);
    }
  }, [notes]);

  const value: AppState | null = {
    activeNote: {
      id: activeNoteId,
      setId: setActiveNoteId,
      editable,
      setEditable,
    } as ActiveNote,
    notes: notes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
