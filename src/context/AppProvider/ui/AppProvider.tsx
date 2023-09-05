import { createContext, useEffect, useState } from 'react';
import { FirstNoteId, IAppState, Props, IActiveNote } from '../models';
import { db } from '../../../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Note } from '../../../db';

const AppContext = createContext<IAppState | null>(null);

function AppProvider({ children }: Props) {
  const [firstNoteId, setFirstNoteId] = useState<FirstNoteId>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>('');
  const notes: Note[] | undefined = useLiveQuery(
    () =>
      searchString === ''
        ? db.notes.orderBy('updatedAt').reverse().toArray()
        : db.notes
            .orderBy('updatedAt')
            .reverse()
            .filter((note) => {
              const regexp = new RegExp(searchString, 'ig');
              return regexp.test(note.content) || regexp.test(note.title);
            })
            .toArray(),
    [searchString],
    undefined
  );

  useEffect(() => {
    if (notes && notes?.length > 0) {
      const id: number | null = notes[0].id ?? null;
      setFirstNoteId(id);
    }
  }, [notes]);

  const value: IAppState | null = {
    activeNote: {
      editable,
      setEditable,
    } as IActiveNote,
    search: { value: searchString, setValue: setSearchString },
    firstNoteId,
    notes: notes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
