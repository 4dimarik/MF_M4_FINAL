import { ReactNode } from 'react';
import { Note } from '../../db';

export type ActiveNoteId = number | null;

export interface ActiveNote {
  id: ActiveNoteId;
  setId?: (activeNote: ActiveNoteId) => void;
  value?: Note;
}

export interface AppState {
  activeNote: ActiveNote;
  notes: Note[] | undefined;
}

export interface Props {
  children?: ReactNode;
}
