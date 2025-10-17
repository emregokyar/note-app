import BASE_API from "./base";

const getAllNotes = async () => {
  const res = await BASE_API.get("/notes");
  return res.data;
};

const createNote = async (note) => {
  const res = await BASE_API.post("/newNote", note);
  return res.data;
};

const updateNote = async (note, id) => {
  const res = await BASE_API.patch(`/update/${id}`, note);
  return res.data;
};

const deleteNote = async (id) => {
  await BASE_API.delete(`/delete/${id}`);
};

export { getAllNotes, createNote, updateNote, deleteNote };
