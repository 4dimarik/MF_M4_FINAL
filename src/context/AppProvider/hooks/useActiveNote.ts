import { useContext } from 'react';
import { AppContext } from '../ui/AppProvider';
import { IAppState } from '../models';

export function useActiveNote() {
  const appState: IAppState | null = useContext(AppContext);
  return appState?.activeNote;
}
