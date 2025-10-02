import db, { connectDB } from "../config/db";
import { frontEndPath } from "../..";

const indexPage = async (req, res) => {
  res.sendFile();
};

export default indexPage;
