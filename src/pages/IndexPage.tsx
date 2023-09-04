import { Navigate } from 'react-router-dom';
import { IAppState } from '../context/AppProvider/models';
import { useAppState } from '../context/AppProvider';

export default function IndexPage() {
  const appState: IAppState | null = useAppState();
  const activeNoteId = appState?.activeNote.id;

  if (activeNoteId) {
    return <Navigate to={`/note/${activeNoteId}`} replace />;
  }
  return <div>IndexPage</div>;
}
