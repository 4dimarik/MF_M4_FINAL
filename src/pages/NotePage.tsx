import { useParams } from 'react-router-dom';
import { db, Note } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import TextEditor from '../components/TextEditor';

export default function NotePage() {
  const { id } = useParams();
  let note: Note | undefined = undefined;
  note = useLiveQuery(() => db.notes.get(Number(id)), [id], undefined);
  return note && id == note.id && <TextEditor activeNote={note} />;
}
