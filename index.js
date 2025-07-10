import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import likeRoutes from './routes/likes.js';
import authRoutes from './routes/auth.js';


const app = express();
console.log("🔵 Starting server...");

// ✅ Correct CORS setup
app.use(cors({
  origin: process.env.FRONTEND_URL, // Use environment variable for flexibility
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Social Media API');
});

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

export default app;