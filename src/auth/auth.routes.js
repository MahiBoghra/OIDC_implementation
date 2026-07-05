// Path: src\auth\auth.routes.js
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/db.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_fallback';

// SIGNUP Route
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into database
        const queryText = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at';
        const result = await pool.query(queryText, [email.toLowerCase().trim(), hashedPassword]);

        const newUser = result.rows[0];
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                created_at: newUser.created_at
            }
        });
    } catch (err) {
        // Check for unique constraint violation (error code 23505 in PostgreSQL)
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Email already exists' });
        }
        console.error('Error during signup:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// LOGIN Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Fetch user from database
        const queryText = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(queryText, [email.toLowerCase().trim()]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                created_at: user.created_at
            }
        });
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;


