import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json("No token provided");
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.status(403).json("Token is not valid");
    
    req.user = user;
    next();
  });
};
