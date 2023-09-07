import { createContext, useEffect, useState } from 'react';
import { FirstNoteId, IAppState, Props, IActiveNote, Notes } from '../models';
import notesService from '../../../services/notesService';
import { useLiveQuery } from 'dexie-react-hooks';

const AppContext = createContext<IAppState | null>(null);

function AppProvider({ children }: Props) {
  const [firstNoteId, setFirstNoteId] = useState<FirstNoteId>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>('');
  const [notes, setNotes] = useState<Notes>(undefined);

  useLiveQuery(
    async () => {
      if (searchString === '') {
        const _notes: Notes = await notesService.fetchAll();
        setNotes(_notes);
      } else {
        const _notes: Notes = await notesService.fetch(searchString);
        setNotes(_notes);
      }
    },
    [searchString],
    undefined
  ) as Notes;

  useEffect(() => {
    if (notes && notes?.length > 0) {
      setFirstNoteId(notes[0].id as FirstNoteId);
    } else {
      setFirstNoteId(null);
    }
  }, [notes]);

  const value: IAppState | null = {
    activeNote: {
      editable,
      setEditable,
    } as IActiveNote,
    search: { value: searchString, setValue: setSearchString },
    firstNoteId,
    setFirstNoteId,
    notes: notes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
