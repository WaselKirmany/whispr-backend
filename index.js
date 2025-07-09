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

// ✅ Correct CORS setup
app.use(cors({
  origin: "https://whispr-react.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Optional CORS debug logging
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://whispr-react.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Routes
app.use("/api/posts", postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Social Media API');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default app;