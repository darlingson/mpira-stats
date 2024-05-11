const sqlite3 = require('sqlite3').verbose();

// Create SQLite database connection
const db = new sqlite3.Database('users.db');

// Create users table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
        )
    `, (err: Error | null) => { // Explicitly define the type for err
        if (err) {
            console.error('Error creating users table:', err);
        } else {
            console.log('Users table created successfully');
        }
    });
});

// Close database connection
db.close((err: Error | null) => { // Explicitly define the type for err
    if (err) {
        console.error('Error closing database connection:', err);
    } else {
        console.log('Database connection closed');
    }
});
