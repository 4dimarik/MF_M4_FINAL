import { createContext, useState } from 'react';
import { ActiveNoteId, AppState, Props, ActiveNote } from '../models';
import { db } from '../../../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Note } from '../../../db';

const AppContext = createContext<AppState | null>(null);

function AppProvider({ children }: Props) {
  const [activeNoteId, setActiveNoteId] = useState<ActiveNoteId>(null);
  const notes: Note[] | undefined = useLiveQuery(() => db.notes.toArray());

  console.log(notes);

  const value: AppState | null = {
    activeNote: { value: activeNoteId, set: setActiveNoteId } as ActiveNote,
    notes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
