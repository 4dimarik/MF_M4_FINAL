import { useParams } from 'react-router-dom';
import { db, Note } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import TextEditor from '../components/TextEditor';
import { IActiveNote } from '../context/AppProvider/models';
import { useActiveNote } from '../context/AppProvider';
import { useNavigate } from 'react-router-dom';

export default function NotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  let note: Note | undefined = undefined;
  note = useLiveQuery(
    async () => {
      const note: Note | undefined = await db.notes.get(Number(id));
      if (!note) navigate('/404');
      return note;
    },
    [id],
    undefined
  );

  const activeNote: IActiveNote | undefined = useActiveNote();
  const editable: boolean = activeNote ? activeNote?.editable : false;

  return (
    note && id == note.id && <TextEditor note={note} editable={editable} />
  );
}
