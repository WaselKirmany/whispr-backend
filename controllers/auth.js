import {db} from '../connect.js';
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

    const q = 'INSERT INTO users(username, email, password, profilePic) VALUES ($1, $2, $3, $4)';
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      dp
    ];

    db.query(q, values, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('User has been created.');
    });
  });
};


export const login = (req, res) => {

    console.log("🔵 /api/auth/login route hit");
    console.log("🟡 Request body:", req.body);

    const q= 'SELECT * FROM users WHERE username = $1';
    db.query(q, [req.body.username], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.rows.length===0) return res.status(404).json('User Not Found');

        const user = result.rows[0];

        const checkPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!checkPassword) return res.status(400).json('Wrong Password or Username');

        const token = jwt.sign({id: user.id}, "secretkey");
        const {password, ...others} = user;

        res.cookie("accessToken", token, {
            httpOnly: true 
        }).status(200).json(others);
    });//Check password
}



export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none",
    }).status(200).json("User has been logged out.");

}   
