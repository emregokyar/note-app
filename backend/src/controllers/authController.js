import passport from "passport";
import { findUserByEmail, createUser } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

// Creating account with local authentication
async function createAccount(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userResult = await findUserByEmail(email);

    if (userResult !== null) {
      res.status(404).json({
        message: "This account is already registered.",
      });
    } else {
      bcrypt.hash(password, SALT_ROUNDS, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(404).json({ message: "Something went wrong" });
        } else {
          const user = await createUser(email, hash);

          /*
          // Session login
          req.login(user, (err) => {
            res.status(200).json({
              url: "/home",
            });
          });
          */

          // Login users with a jwt token
          const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
          );

          // Sending JWT token to user
          return res.status(200).json({
            message: "Login Successful",
            token: token,
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
}

// Initial login request with google
function loginRequest(req, res, next) {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
}

// Login with google
function loginWithGoogle(req, res, next) {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error during login." });
    }
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or invalid credentials." });
    }

    /*
    // Login with session
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed." });
      }
      return res.status(200).json({
        message: "Login successful!",
        username: user.email,
      });
    });
    */

    // Login users with a jwt token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Sending JWT token to user
    return res.status(200).json({
      message: "Login Successful",
      token: token,
    });
  })(req, res, next);
}

// Locally login
function localLogin(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error during login." });
    }
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or invalid credentials." });
    }

    /*
    // Login the users with session
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed." });
      }
      return res.status(200).json({
        message: "Login successful!",
        username: user.email,
      });
    });
    */

    // Login users with a jwt token
    const token = jwt.sign(
      { id: user.id, email: user.email }, // payload
      JWT_SECRET, // secret key
      { expiresIn: "1h" } // lifetime
    );

    // Sending JWT token to user
    return res.status(200).json({
      message: "Login Successful",
      token: token,
    });
  })(req, res, next);
}

/*
// Logout session
async function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      success: true,
    });
  });
}
*/

function logout(req, res) {
  return res.status(200).json({
    success: true,
    message: "Please remove token on client side.",
  });
}

export { localLogin, logout, loginWithGoogle, createAccount, loginRequest };
