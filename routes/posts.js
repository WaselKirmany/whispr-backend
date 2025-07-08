import express from 'express';
import {getPosts,createPost, getSinglePost,getPostsByUsername, getTopLikedPosts } from '../controllers/post.js';

const router = express.Router();

router.get("/",getPosts);
router.post("/", createPost); 
router.get("/top-liked", getTopLikedPosts);
router.get("/:id", getSinglePost);
router.get("/user/:username", getPostsByUsername);


export default router;
