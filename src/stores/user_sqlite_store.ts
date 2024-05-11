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

    constructor(username: string, password: string) {
        this.id = uuidv4();
        this.username = username;
        this.password = password;
    }

    async save(): Promise<void> {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        db.run(`
            INSERT INTO users (id, username, password)
            VALUES (?, ?, ?)
        `, [this.id, this.username, hashedPassword], (err) => {
            if (err) {
                throw new Error('Failed to save user');
            }
        });
    }
    //method for login called findOne
    static async findOne(username: string): Promise<User | null> {
        const user = await db.get(`
            SELECT *
            FROM users
            WHERE username = ?
        `, [username]);
        if (!user) {
            return null;
        }
        return new User(user.username, user.password);
    }
}

export default User;
