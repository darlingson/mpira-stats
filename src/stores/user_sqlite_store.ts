// models/User.ts

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import sqlite3 from 'sqlite3';

// Create SQLite database connection
const db = new sqlite3.Database('users.db');

class User {
    id: string;
    username: string;
    password: string;
    constructor(username: string, password: string, id: string = uuidv4()) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    async save(): Promise<void> {
        // const hashedPassword = await bcrypt.hash(this.password, 10);
        db.run(`
            INSERT INTO users (id, username, password)
            VALUES (?, ?, ?)
        `, [this.id, this.username, this.password], (err) => {
            if (err) {
                throw new Error('Failed to save user');
            }
        });
    }
    //method for login called findOne
    static async findOne(username: string): Promise<User | null> {
        return new Promise<User | null>((resolve, reject) => {
            db.all(`
                SELECT *
                FROM users
                WHERE username = ?
            `, [username], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (rows.length === 0) {
                    resolve(null); // User not found
                    return;
                }
                // Assuming the first row contains the user data
                const userData = rows[0] as { password: string, id: string, username: string };
                const { id, username, password } = userData;
                resolve(new User(username, password, id));
            });
        });
    }
    
}

export default User;
