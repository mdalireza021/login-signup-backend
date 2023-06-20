import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error);
});

db.once('connected', () => {
    console.log('Database Connected!');
});

export default db;
