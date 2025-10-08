import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotev from "dotenv";
import passport from "passport";
import session from "express-session";

// Initializng Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Env variables
dotev.config();

// Initializing express app
const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Static Files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Running the app
app.listen(PORT, () => {
  console.log("Server runnig on port: " + PORT);
});
