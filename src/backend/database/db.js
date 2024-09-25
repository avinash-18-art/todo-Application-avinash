const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new database connection
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Function to initialize the database and create required tables
const initializeDatabase = () => {
  // Create users table
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  // Create tasks table
  const createTasksTable = `
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      userId TEXT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `;

  db.serialize(() => {
    db.run(createUsersTable, (err) => {
      if (err) {
        console.error('Error creating users table:', err.message);
      } else {
        console.log('Users table created or already exists.');
      }
    });

    db.run(createTasksTable, (err) => {
      if (err) {
        console.error('Error creating tasks table:', err.message);
      } else {
        console.log('Tasks table created or already exists.');
      }
    });
  });
};

// Initialize the database and create tables
initializeDatabase();

// Export the database object for use in other files
module.exports = db;
