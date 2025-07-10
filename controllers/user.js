import pool from "../connect.js";

export const getUserByUsername = (req, res) => {
  const username = req.params.username;

  const q = `SELECT id, username, profilePic FROM users WHERE username = $1`;

  pool.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.rows.length === 0) return res.status(404).json("User not found");
    return res.status(200).json(data.rows[0]);
  });
};