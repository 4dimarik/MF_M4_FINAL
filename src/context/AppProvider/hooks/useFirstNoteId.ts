import { useContext } from 'react';
import { AppContext } from '../ui/AppProvider';
import { IAppState } from '../models';

export function useFirstNoteId() {
  const appState: IAppState | null = useContext(AppContext);
  return appState?.firstNoteId;
}
