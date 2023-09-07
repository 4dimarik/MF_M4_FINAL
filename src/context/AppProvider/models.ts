import { ReactNode } from 'react';
import { Note } from '../../db';

export type Notes = Note[] | undefined;
export type FirstNoteId = number | null;

export interface IActiveNote {
  editable: boolean;
  setEditable: (editable: boolean) => void;
}

export interface ISearch {
  value: string;
  setValue: (value: string) => void;
}

export interface IAppState {
  activeNote: IActiveNote;
  firstNoteId: FirstNoteId;
  setFirstNoteId: (value: FirstNoteId) => void;
  search: ISearch;
  notes: Note[] | undefined;
  // setNotes: (value: Notes) => void;
  // reloadNotes: () => void;
}

export interface Props {
  children?: ReactNode;
}
