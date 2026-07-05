// Path: src\app.js
import express from 'express';
import authRouter from './auth/auth.routes.js';

const app = express();

// Middleware to parse JSON payloads
app.use(express.json());

// Register Auth Routes
app.use('/auth', authRouter);

export default app;
