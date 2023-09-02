import { db } from '../db';
import { Note } from '../db';
import { toast } from 'react-toastify';

export interface ActionResult {
  status: 'ok' | 'error';
  message: string | null;
  note?: Note;
  id?: number;
}

const notesService = {
  add: async (note: Partial<Note> = {}) => {
    const newNote: Note = {
      title: '',
      content: '',
      createdAt: Date.now(),
      updateAt: Date.now(),
      ...note,
    };

    try {
      const id = await db.notes.add(newNote);

      const result = {
        status: 'ok',
        message: `Заметка '${newNote.title}'успешно добавлена.`,
        note: newNote,
        id: id,
      } as ActionResult;

      toast.success(result.message);

      return result;
    } catch (error) {
      const result = {
        status: 'error',
        message: `Ошибка при добавлении заметки '${newNote.title}': ${error}`,
      } as ActionResult;

      toast.error(result.message);

      return result;
    }
  },
  update: async (note: Partial<Note>) => {
    const newNote: Note = {
      title: '',
      content: '',
      ...note,
      updateAt: Date.now(),
    };
    if (note.id) {
      const updated = await db.notes.update(note.id, newNote);
      console.log(updated);
    }
  },
  detele: async (id: number) => {
    try {
      await db.notes.delete(id);
      const result = {
        status: 'ok',
        message: `Заметка успешно удалена`,
      } as ActionResult;

      toast.success(result.message);

      return result;
    } catch (error) {
      const result = {
        status: 'error',
        message: `Ошибка при удалении заметки id=${id}: ${error}`,
      } as ActionResult;

      toast.error(result.message);

      return result;
    }
  },
};

export default notesService;
