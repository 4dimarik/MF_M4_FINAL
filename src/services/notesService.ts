import { db } from '../db';
import { Note } from '../db';

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

      return {
        status: 'ok',
        message: `Заметка ${newNote.title} успешно добавлена. Id=${id}`,
        note: newNote,
        id: id,
      } as ActionResult;
    } catch (error) {
      return {
        status: 'error',
        message: `Ошибка при добавлении заметки ${newNote.title}: ${error}`,
      } as ActionResult;
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
      return {
        status: 'ok',
        message: `Заметка успешно удалена`,
      } as ActionResult;
    } catch (error) {
      return {
        status: 'error',
        message: `Ошибка при удалении заметки id=${id}: ${error}`,
      } as ActionResult;
    }
  },
};

export default notesService;
