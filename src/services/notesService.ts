import { db } from '../db';
import { Note } from '../db';
import { toast } from 'react-toastify';
import moment from 'moment';

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
      createdAt: moment.utc().unix(),
      updatedAt: moment.utc().unix(),
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
      updatedAt: moment.utc().unix(),
    };
    if (note.id) {
      db.notes.update(note.id, newNote);
    }
  },
  delete: async (id: number) => {
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
  get: async (id: number) => {
    try {
      return await db.notes.get(id);
    } catch (error) {
      const result = {
        status: 'error',
        message: `Заметки id=${id} не найдена: ${error}`,
      } as ActionResult;

      toast.error(result.message);

      return undefined;
    }
  },
  fetchAll: async () => {
    try {
      return await db.notes.orderBy('updatedAt').reverse().toArray();
    } catch (error) {
      const result = {
        status: 'error',
        message: `${error}`,
      } as ActionResult;

      toast.error(result.message);

      return undefined;
    }
  },
  fetch: async (search: string) => {
    try {
      return await db.notes
        .orderBy('updatedAt')
        .reverse()
        .filter((note) => {
          const regexp = new RegExp(search, 'ig');
          return regexp.test(note.content) || regexp.test(note.title);
        })
        .toArray();
    } catch (error) {
      const result = {
        status: 'error',
        message: `${error}`,
      } as ActionResult;

      toast.error(result.message);

      return undefined;
    }
  },
};

export default notesService;
