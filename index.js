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

// Middleware
// app.use((req,res,next) => {
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://whispr-react.vercel.app');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Add allowed methods
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Add allowed headers
//   next();
// });

const allowedOrigins = [
  'https://whispr-react.vercel.app',
  'https://whispr-react-rb8w3tx74-wasel-kirmanys-projects.vercel.app', // preview URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(cookieParser());

// Routes
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