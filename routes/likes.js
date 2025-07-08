import express from "express";
import { addLike, removeLike, getLikeCount ,hasLiked} from "../controllers/like.js";


const router = express.Router();

router.post("/", addLike);
router.delete("/:postId", removeLike);
router.get("/", hasLiked);
router.get("/count/:postId", getLikeCount);

export default router;