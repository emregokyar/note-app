import passport from "passport";
import { findUserByEmail, createUser } from "../models/userModel.js";

const SALT_ROUNDS = 10;

// Creating account with local authentication
async function createAccount(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userResult = await findUserByEmail(email);
    if (userResult !== null) {
      req.json({
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
async function loginRequest() {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  });
}

// Local login strategy after success
async function loginWithLocal() {
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
  });
}

// Google login strategy
async function loginWithGoogle() {
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/",
  });
}

// Logout
async function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

export { logout, loginWithGoogle, loginWithLocal, createAccount, loginRequest };
