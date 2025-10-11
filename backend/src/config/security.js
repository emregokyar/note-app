import passport from "passport";
import dotenv from "dotenv";
import GoogleStrategy from "passport-google-oauth2";
import { Strategy } from "passport-local";
import { createGoogleUser, findUserByEmail } from "../models/userModel.js";
import bcrypt from "bcrypt";

dotenv.config();
const APP_PORT = process.env.APP_PORT || 3000;

//Google strategy to authenticate users
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:" + APP_PORT + "/auth/google/home", //Redirection Url after succesfull login
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo", // Retrieving user info from google
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // If user is already exists in db, use this info else create new user
        const result = await findUserByEmail(profile.email);
        if (result === null) {
          const newUser = await createGoogleUser(profile.email);
          return cb(null, await newUser);
        } else {
          return cb(null, result);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// Local login strategy to authenticate users
passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await findUserByEmail(username);
      if (result !== null) {
        const storedHashedPassword = result.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error checking passwords: ", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, result);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found.");
      }
    } catch (error) {
      return cb(error);
    }
  })
);

// Saving the cookie
passport.serializeUser((user, cb) => {
  cb(null, user);
});

// Using the cookie value
passport.deserializeUser((user, cb) => {
  cb(null, user);
});
