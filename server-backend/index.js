// Entry point
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import lessonRoutes from './routes/lessons.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running');
});
