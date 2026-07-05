import pool from './db.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initDatabase() {
    try {
        const schemaPath = path.join(__dirname, '../auth/schema.sql');
        const schemaSql = await fs.readFile(schemaPath, 'utf8');
        await pool.query(schemaSql);
        console.log('Database initialized successfully (users table checked/created).');
    } catch (err) {
        console.error('Failed to initialize database schema:', err);
        throw err;
    }
}
