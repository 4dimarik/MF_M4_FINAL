import { ReactNode } from 'react';
import { Note } from '../../db';

export type ActiveNoteId = number | null;

export interface IActiveNote {
  id: ActiveNoteId;
  setId?: (activeNote: ActiveNoteId) => void;
  editable: boolean;
  setEditable: (editable: boolean) => void;
}

export interface ISearch {
  value: string;
  setValue: (value: string) => void;
}

export interface IAppState {
  activeNote: IActiveNote;
  search: ISearch;
  notes: Note[] | undefined;
}

export interface Props {
  children?: ReactNode;
}
