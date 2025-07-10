import express from 'express';
import {getPosts,createPost, getSinglePost,getPostsByUsername, getTopLikedPosts } from '../controllers/post.js';
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/",verifyToken,getPosts);
router.post("/",verifyToken, createPost); 
router.get("/top-liked", getTopLikedPosts);
router.get("/:id", getSinglePost);
router.get("/user/:username", getPostsByUsername);


export default router;
