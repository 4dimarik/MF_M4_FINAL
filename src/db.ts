import Dexie, { Table } from 'dexie';
import defaultNotes from './defaultNotes';

export interface Note {
  id?: number;
  title: string;
  content: string;
  createdAt?: number;
  updatedAt?: number;
}

export class NotesDB extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super('NotesDB');
    this.version(1).stores({
      notes: '++id, title, content, createdAt, updatedAt',
    });
  }
}

export const db = new NotesDB();

// db.on('populate', defaultNotes);

export function resetDatabase() {
  return db.transaction('rw', db.notes, async () => {
    await Promise.all(db.tables.map((table) => table.clear()));
    await defaultNotes();
  });
}
