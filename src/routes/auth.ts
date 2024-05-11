import express, { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../stores/user_sqlite_store';
export const authRoutes = Router();
authRoutes.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username && !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = new User(username, hash);
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

authRoutes.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username && !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }
        const user = await User.findOne(username);
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
            expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});