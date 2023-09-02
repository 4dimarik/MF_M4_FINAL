import { useContext } from 'react';
import { AppContext } from '../ui/AppProvider';

export function useAppState() {
  return useContext(AppContext);
}
