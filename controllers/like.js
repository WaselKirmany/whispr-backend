import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikeCount = (req, res) => {
  const postId = req.params.postId;

  const q = "SELECT COUNT(*) FROM likes WHERE postId = $1";
  db.query(q, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ count: parseInt(data.rows[0].count) });
  });
};


export const addLike = (req, res) => {
  // const token = req.cookies.accessToken;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid");

    const q = `
      INSERT INTO likes (userId, postId)
      VALUES ($1, $2)
      ON CONFLICT (userId, postId) DO NOTHING
    `;
    const values = [userInfo.id, req.body.postId];

    db.query(q, values, (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json("Post liked");
    });
  });
};

export const removeLike = (req, res) => {
  // const token = req.cookies.accessToken;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid");

    const q = "DELETE FROM likes WHERE userId = $1 AND postId = $2";
    db.query(q, [userInfo.id, req.params.postId], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json("Like removed");
    });
  });
};

export const hasLiked = (req, res) => {
  // const token = req.cookies.accessToken;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid");

    const q = "SELECT * FROM likes WHERE userId = $1 AND postId = $2";
    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.rows.length > 0); // true or false
    });
  });
};