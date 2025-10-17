import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findUserById } from "../models/userModel.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Checking auth headers
  if (!authHeader && !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Auth header is missing." });
  }

  //Retrieving the token
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(404).json({ message: "Token not found." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await findUserById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    //Attaching user info
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};

export default verifyToken;
