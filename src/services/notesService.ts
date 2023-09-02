import { db } from '../db';
import { Note } from '../db';

const notesService = {
  add: async function add(note: Partial<Note>) {
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
      };
    } catch (error) {
      return {
        status: 'error',
        message: `Ошибка при добавлении заметки ${newNote.title}: ${error}`,
      };
    }
  },
  update: async function update(note: Partial<Note>) {
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
};

export default notesService;
