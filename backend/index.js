import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotev from "dotenv";
import db, { connectDB } from "./src/config/db";

// Importing routes
import homeRoute from "./src/routes/home.js";

// Initializng Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontEndPath = path.join(__dirname, "..", "frontend");

// Env variables
dotev.config();

// Initializing express app
const app = express();
const PORT = process.env.APP_PORT || 3000;

// Static Files
app.use(express.static(frontEndPath));
app.use(express.urlencoded({ extended: true }));
// Parse incoming json req
app.use(express.json());

//Routes
//app.use("/", homeRoute);

// Running the app
app.listen(PORT, () => {
  console.log("Server runnig on port: " + PORT);
});

export { frontEndPath };
