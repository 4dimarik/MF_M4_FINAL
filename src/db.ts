import Dexie, { Table } from 'dexie';

export interface Note {
  id?: number;
  title: string;
  content: string;
  createdAt?: number;
  updateAt?: number;
}

export class AppSubClassedDexie extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super('appDatabase');
    this.version(1).stores({
      notes: '++id, title, content, createdAt, updateAt',
    });
  }
}

export const db = new AppSubClassedDexie();
