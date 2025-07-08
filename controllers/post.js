import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  console.log("Cookies:", req.cookies);

  jwt.verify(token, "secretkey", (err) => {
    if (err) {
      console.error("Token verification failed in getPosts:", err);
      return res.status(403).json("Token is not valid!");
    }
    console.log(userId);

   const q = `
    SELECT p.*, u.username, u.profilePic 
    FROM posts p 
    JOIN users u ON p.userId = u.id
    ORDER BY p.created_at DESC
    `;

    db.query(q, (err, data) => {
      if (err){
        console.error("Database error in getPosts:", err); // Log full error
        return res.status(500).json(err);
      }
      console.log("Fetched rows:", data.rows);
      res.status(200).json(data.rows);
    });
  });
}

export const createPost = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Not authenticated");
  }

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json("Title and description are required");
    }

    const q = `
      INSERT INTO posts (title, description, userId, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *
    `;

    const values = [title, description, userInfo.id];

    db.query(q, values, (err, result) => {
      if (err) {
        console.error("DB error in createPost:", err);
        return res.status(500).json(err);
      }

      res.status(201).json(result.rows[0]);
    });
  });
};

export const getSinglePost = (req, res) => {
  const postId = req.params.id;

  const q = `
    SELECT p.*, u.username, u.profilePic
    FROM posts p
    JOIN users u ON p.userId = u.id
    WHERE p.id = $1
  `;

  db.query(q, [postId], (err, data) => {
    if (err) {
      console.error("Error fetching post:", err);
      return res.status(500).json(err);
    }

    if (data.rows.length === 0) {
      return res.status(404).json("Post not found");
    }

    res.status(200).json(data.rows[0]);
  });
};

export const getPostsByUsername = (req, res) => {
  const username = req.params.username;

  const q = `
    SELECT p.*, u.username, u.profilePic
    FROM posts p
    JOIN users u ON p.userId = u.id
    WHERE u.username = $1
    ORDER BY p.created_at DESC
  `;

  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.rows);
  });
};

export const getTopLikedPosts = (req, res) => {
  const q = `
    SELECT 
      p.id,
      p.title,
      p.description,
      u.username,
      u.profilepic,
      COUNT(l.id) AS likecount
    FROM posts p
    JOIN users u ON p.userid = u.id
    LEFT JOIN likes l ON l.postid = p.id
    GROUP BY p.id, p.title, p.description, u.username, u.profilepic
    ORDER BY likecount DESC
    LIMIT 5
  `;

  db.query(q, [], (err, data) => {
    if (err) {
      console.error("Error fetching top-liked posts:", err);
      return res.status(500).json("Internal Server Error");
    }
    res.status(200).json(data.rows);
  });
};