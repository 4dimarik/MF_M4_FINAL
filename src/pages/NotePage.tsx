import { useParams } from 'react-router-dom';
import { db, Note } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import TextEditor from '../components/TextEditor';

export default function NotePage() {
  const { id } = useParams();
  const note: Note | undefined = useLiveQuery(() => db.notes.get(Number(id)));

  return note && <TextEditor activeNote={note} />;
}
