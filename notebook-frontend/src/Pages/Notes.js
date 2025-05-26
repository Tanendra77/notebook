import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../Styles/notes.css"; // Make sure to create this CSS file

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editForm, setEditForm] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      setError("Failed to fetch notes");
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };
  
    useEffect(() => {
      fetchNotes();
    }, [fetchNotes]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    try {
      await API.post("/notes", form);
      setForm({ title: "", content: "" });
      fetchNotes();
    } catch (err) {
      setError("Could not create note");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      setError("Could not delete note");
    }
  };

  const startEdit = (note) => {
    setEditId(note._id);
    setEditForm({ title: note.title, content: note.content });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({ title: "", content: "" });
  };

  const saveEdit = async (id) => {
    try {
      await API.put(`/notes/${id}`, editForm);
      setEditId(null);
      setEditForm({ title: "", content: "" });
      fetchNotes();
    } catch (err) {
      setError("Could not update note");
    }
  };

  return (
    <div className="container">
      <h2>Your Notes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Create Note */}
      <div className="card">
        <div className="head">Create Note</div>
        <div className="content">
          <form onSubmit={handleSubmit} className="note-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
            <button className="button" type="submit">Add Note</button>
          </form>
        </div>
      </div>

      {/* Notes List */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {notes.length === 0 ? (
          <p>No notes yet</p>
        ) : (
          notes.map((note) => (
            <div className="card" key={note._id}>
              <div className="head">{note.title}</div>
              <div className="content">
                {editId === note._id ? (
                  <>
                    <input
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                    />
                    <textarea
                      name="content"
                      value={editForm.content}
                      onChange={handleEditChange}
                      rows={4}
                    />
                    <button className="button" onClick={() => saveEdit(note._id)}>Save</button>
                    <button className="button" onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <p>{note.content}</p>
                    <button className="button" onClick={() => startEdit(note)}>Edit</button>{" "}
                    <button className="button" onClick={() => handleDelete(note._id)}>Delete</button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
