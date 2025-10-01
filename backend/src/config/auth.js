import passport from "passport";
import env from "dotenv";
import GoogleStrategy, { Strategy } from "passport-google-oauth2";
import db, { connectDB } from "./db";

env.config();
connectDB();

//google strategy to login account
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/home", //Redirection Url after succesfull login
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo", // Retrieving user info from google
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        console.log(accessToken);
        console.log(refreshToken);

        // If user is already exists in db, use this info else create new user
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = db.query(
            "INSERT INTO users(email, password) VALUES($1 ,$2) RETURNING *  ",
            [profile.email, "google"]
          );
          return cb(null, (await newUser).rows[0]);
        } else {
          return cb(null, result.rows[0]);
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
      const result = await db.query("SELECT * FROM users WHEERE email = $1", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error checking passwords: ", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
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

// Local strategy to authenticate to users
passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              //Passed password check
              return cb(null, user);
            } else {
              //Did not pass password check
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
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

export default passport;
