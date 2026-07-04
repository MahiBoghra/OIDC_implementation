// Path: server.js
import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try{
    //connect DB
    // connectDB();

    console.log(`Server is running on port ${PORT}`);
    }catch(err){
        console.error('Error connecting to the server/DB:', err);
    }
});


