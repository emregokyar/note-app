import pool from "../config/db";

async function createNote(userId, title, note) {
  try {
    const result = pool.query(
      "INSERT INTO notes(title, note, user_id) VALUES ($1, $2, $3)",
      [title, note, userId]
    );

    return (await result).rows[0];
  } catch (error) {
    console.error("Error creating note: ", error);
    return null;
  }
}

async function getAllNotes(userId) {
  try {
    const result = pool.query("SELECT * FROM notes WHERE user_id = $1", [
      userId,
    ]);
    return (await result).rows;
  } catch (error) {
    console.error("Error retrieving all notes: ", error);
    return null;
  }
}

async function deleteNote(noteId) {
  try {
    pool.query("DELETE FROM notes WHERE id = $1", [noteId]);
    return true;
  } catch (error) {
    console.error("Something went wrong trying deleting note: ", error);
    return false;
  }
}
