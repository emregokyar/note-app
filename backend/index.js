import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import "./src/config/security.js";
import authRoutes from "./src/routes/auth.js";
import homeRoutes from "./src/routes/home.js";

// Env variables
dotenv.config();
// Initializng Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initializing express app
const app = express();
const PORT = process.env.APP_PORT || 3000;

// App info
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", authRoutes);
app.use("/", homeRoutes);

// Running the app
app.listen(PORT, () => {
  console.log("Server runnig on port: " + PORT);
});
