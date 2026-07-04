// Path: src\db\db.js
import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const { Pool } = pg;


const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
});

export default pool;