import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const db = await open({
    filename: './backend/database.db',
    driver: sqlite3.Database
});

await db.exec(`
            CREATE TABLE IF NOT EXISTS waitlist (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
`);

export default db;
