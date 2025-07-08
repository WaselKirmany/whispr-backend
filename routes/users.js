import express from "express";
import { getUserByUsername } from "../controllers/user.js";

const router = express.Router();

router.get("/:username", getUserByUsername);

export default router;