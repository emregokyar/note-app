import passport from "passport";
import { findUserByEmail, createUser } from "../models/userModel.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Creating account with local authentication
async function createAccount(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userResult = await findUserByEmail(email);

    if (userResult !== null) {
      res.json({
        message: "This account is already registered.",
      });
    } else {
      bcrypt.hash(password, SALT_ROUNDS, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const user = await createUser(email, hash);
          req.login(user, (err) => {
            res.status(200).json({
              url: "/home",
            });
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

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed." });
      }
      return res.status(200).json({
        message: "Login successful!",
        username: user.email,
      });
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

    // Logining the users
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed." });
      }
      return res.status(200).json({
        message: "Login successful!",
        username: user.email,
      });
    });
  })(req, res, next);
}

// Logout
async function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      success: true,
      url: "/",
    });
  });
}

export { localLogin, logout, loginWithGoogle, createAccount, loginRequest };
