import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirstNoteId } from '../context/AppProvider';

export default function IndexPage() {
  const firstNoteId = useFirstNoteId();
  const navigate = useNavigate();

  useEffect(() => {
    if (firstNoteId) {
      navigate(`/note/${firstNoteId}`, { replace: true });
    }
  }, [firstNoteId, navigate]);

  return <></>;
}
