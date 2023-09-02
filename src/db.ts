import Dexie, { Table } from 'dexie';

export interface Note {
  id?: number;
  title: string;
  content: string;
  createdAt?: number;
  updateAt?: number;
}

export class NotesDB extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super('NotesDB');
    this.version(1).stores({
      notes: '++id, title, content, createdAt, updateAt',
    });
  }
}

export const db = new NotesDB();
