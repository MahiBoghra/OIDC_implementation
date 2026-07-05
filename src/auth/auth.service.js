import pool from '../db/db.js';

export const getUserInfo = async (userId) => {
    const queryText = 'SELECT id, email, created_at FROM users WHERE id = $1';
    const result = await pool.query(queryText, [userId]);
    
    if (result.rows.length === 0) {
        throw new Error('User not found');
    }
    
    return result.rows[0];
};
