import { Navigate } from 'react-router-dom';
import { AppState } from '../context/AppProvider/models';
import { useAppState } from '../context/AppProvider';

export default function IndexPage() {
  const appState: AppState | null = useAppState();
  const activeNoteId = appState?.activeNote.id;

  if (activeNoteId) {
    return <Navigate to={`/${activeNoteId}`} replace />;
  }
  return <div>IndexPage</div>;
}
