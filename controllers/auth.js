import db from '../connect.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
  console.log("🔵 /api/auth/register route hit");
  console.log("🟡 Request body:", req.body);

  const q = 'SELECT * FROM users WHERE username = $1';
  db.query(q, [req.body.username], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.rows.length) return res.status(409).json('User Already Exists');

    const dp = `https://api.dicebear.com/7.x/adventurer/svg?seed=${req.body.username}`;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const insertQuery = 'INSERT INTO users(username, email, password, profilePic) VALUES ($1, $2, $3, $4)';
    const values = [req.body.username, req.body.email, hashedPassword, dp];

    db.query(insertQuery, values, (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('User has been created.');
    });
  });
};

export const login = (req, res) => {
  console.log("🔵 /api/auth/login route hit");
  console.log("🟡 Request body:", req.body);

  const q = 'SELECT * FROM users WHERE username = $1';
  db.query(q, [req.body.username], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.rows.length === 0) return res.status(404).json('User Not Found');

    const user = result.rows[0];
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordCorrect) return res.status(400).json('Wrong Password or Username');

    const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "7d" });
    const { password, ...userData } = user;

    // ✅ Send token in response, NOT as a cookie
    return res.status(200).json({
      ...userData,
      token,
    });
  });
};

export const logout = (req, res) => {
  // You don't need this for header-based JWT auth, but you can keep it for reference
  res.status(200).json("User has been logged out.");
};