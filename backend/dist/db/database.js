import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// ES modules replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = path.resolve(__dirname, '../../todo.db');
const db = new Database(dbPath);
// Create tasks table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
                                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     name TEXT NOT NULL,
                                     description TEXT,
                                     due_date TEXT,
                                     status TEXT DEFAULT 'Incomplete' CHECK(status IN ('Incomplete', 'Completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);
export default db;
