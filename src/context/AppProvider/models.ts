import { ReactNode } from 'react';
import { Note } from '../../db';

export type ActiveNoteId = number | null;

export interface ActiveNote {
  value: ActiveNoteId;
  set?: (activeNote: ActiveNoteId) => void;
}

export interface AppState {
  activeNote: ActiveNote;
  notes: Note[] | undefined;
}

export interface Props {
  children?: ReactNode;
}
