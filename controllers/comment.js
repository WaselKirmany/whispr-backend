import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getComments = (req, res) => {
  console.log("🔵 /api/comments/add route hit");
  const postId = req.params.postId;

  if (!postId) return res.status(400).json("Post ID is required");

  const q = `
    SELECT c.*, u.username, u.profilepic
    FROM comments c
    JOIN users u ON c.userid = u.id
    WHERE c.postid = $1
    ORDER BY c.created_at DESC
  `;

  db.query(q, [postId], (err, data) => {
    if (err) {
      console.error("Error fetching comments:", err);
      return res.status(500).json(err);
    }

    res.status(200).json(data.rows);
  });
};

export const addComment = (req, res) => {
  console.log("🔵 /api/comments/ route hit");
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid");

    const q = "INSERT INTO comments (description, userid, postid) VALUES ($1, $2, $3)";
    // const values = [req.body.description, userInfo.id, req.body.postId];
    const values = [req.body.comment, userInfo.id, req.body.postId];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(200).json("Comment added");
    });
  });
};