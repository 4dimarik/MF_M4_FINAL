import { Navigate } from 'react-router-dom';
import { useFirstNoteId } from '../context/AppProvider';

export default function IndexPage() {
  const id = useFirstNoteId();

  if (id) {
    return <Navigate to={`/note/${id}`} replace />;
  }

  return <div>IndexPage</div>;
}
