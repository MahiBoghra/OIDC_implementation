// Path: server.js
import app from './src/app.js';
import dotenv from 'dotenv';
import pool from './src/db/db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try{
    //connect DB
    const result = await pool.query("SELECT NOW();");

        console.log("Connected to PostgreSQL");
        console.log(result.rows);

    console.log(`Server is running on port ${PORT}`);
    }catch(err){
        console.error('Error connecting to the server/DB:', err);
    }
});


