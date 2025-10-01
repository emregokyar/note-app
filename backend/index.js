import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotev from "dotenv";
import db, { connectDB } from "./src/config/db";

// import homeRoute from "./src/routes/home.js"; // Home route

// Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Env variables
dotev.config();

// Initializing express app
const app = express();
const PORT = process.env.APP_PORT || 3000;

// Connecting DB
await connectDB();

// Setting views
//app.set("views", path.join(__dirname, "src/views"));
//app.set("view engine", "ejs");

// Static Files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
//app.use("/", homeRoute);

// Running the app
app.listen(PORT, () => {
  console.log("Server runnig on port: " + PORT);
});
