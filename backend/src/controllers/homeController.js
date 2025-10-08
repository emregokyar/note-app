import { getAllNotes } from "../models/noteModel.js";

const allNotes = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const result = await getAllNotes(req.user.email);
      res.status(200).json({ notes: result });
    } catch (err) {
      console.log(err);
      res.status(404);
    }
  } else {
    res.status(404);
  }
};

export { allNotes };
