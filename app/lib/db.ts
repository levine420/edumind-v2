import Database from 'better-sqlite3';
import path from 'path';

// declare a global variable to hold the database instance
declare global {
  var db: Database.Database | undefined;
}

let db: Database.Database;

if (process.env.NODE_ENV === 'production') {
  const dbPath = path.join(process.cwd(), 'dev.db');
  db = new Database(dbPath);
} else {
  // in development, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement)
  if (!global.db) {
    const dbPath = path.join(process.cwd(), 'dev.db');
    global.db = new Database(dbPath);
    console.log('New DB connection established in development.');
  }
  db = global.db;
}

db.pragma('journal_mode = WAL');
console.log('Database connection is ready.');

export default db;
