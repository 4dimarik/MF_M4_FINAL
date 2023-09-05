import { useParams } from 'react-router-dom';
import { db, Note } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import TextEditor from '../components/TextEditor';
import { IActiveNote } from '../context/AppProvider/models';
import { useActiveNote } from '../context/AppProvider';

export default function NotePage() {
  console.log('NotePage');
  const { id } = useParams();
  let note: Note | undefined = undefined;
  note = useLiveQuery(() => db.notes.get(Number(id)), [id], undefined);
  const activeNote: IActiveNote | undefined = useActiveNote();
  const editable: boolean = activeNote ? activeNote?.editable : false;

  return (
    note && id == note.id && <TextEditor note={note} editable={editable} />
  );
}
