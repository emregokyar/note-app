import pool from "../config/db.js";

async function createNote(userId, title, content) {
  try {
    const result = await pool.query(
      "INSERT INTO notes(title, note, user_id) VALUES ($1, $2, $3) RETURNING *;",
      [title, content, userId]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error creating note: ", error);
    return null;
  }
}

async function getAllNotes(email) {
  try {
    const result = pool.query(
      "SELECT notes.id, notes.title, notes.note FROM notes JOIN users ON users.id = notes.user_id WHERE users.email = $1",
      [email]
    );
    const notes = (await result).rows;
    if (notes) {
      return notes;
    }
    return null;
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

async function updateNoteContent(noteId, content) {
  try {
    const result = await pool.query(
      "UPDATE notes SET note = $1 WHERE id = $2 RETURNING *",
      [content, noteId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating note: ", error);
    return null;
  }
}

async function updateNoteTitle(noteId, title) {
  try {
    const result = await pool.query(
      "UPDATE notes SET title = $1 WHERE id = $2 RETURNING *",
      [title, noteId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating note: ", error);
    return null;
  }
}

async function updateNote(noteId, content, title) {
  try {
    const result = await pool.query(
      "UPDATE notes SET note = $1, title = $2 WHERE id = $3 RETURNING *",
      [content, title, noteId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating note: ", error);
    return null;
  }
}

export {
  deleteNote,
  getAllNotes,
  createNote,
  updateNote,
  updateNoteContent,
  updateNoteTitle,
};
