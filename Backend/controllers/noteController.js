const Note = require("../models/Note");

// Get all notes for the logged-in user
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = new Note({
      user: req.user,
      title,
      content
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Update an existing note
exports.updateNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found" });
    if (note.user.toString() !== req.user)
      return res.status(401).json({ msg: "Not authorized" });

    note.title = title;
    note.content = content;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found" });
    if (note.user.toString() !== req.user)
      return res.status(401).json({ msg: "Not authorized" });

    await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: "Note removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
