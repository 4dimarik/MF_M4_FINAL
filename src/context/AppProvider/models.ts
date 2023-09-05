import { ReactNode } from 'react';
import { Note } from '../../db';

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
  search: ISearch;
  notes: Note[] | undefined;
}

export interface Props {
  children?: ReactNode;
}
