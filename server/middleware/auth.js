import User from "../models/User.js";
import jwt from "jsonwebtoken";

async function verifyToken(req, res, next) {

  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, "jwtSecretKey");

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    res.status(401).json('Not authorized, token failed');
  }
}
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  }
  else {
    res.status(401).json('Not Admin');
  }
}
export { verifyToken, isAdmin }