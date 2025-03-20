const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

// Schema
const NoteSchema = new mongoose.Schema( { text: String });
const Note = mongoose.model("Note", NoteSchema);


// Routes
app.get("/notes", async(req, res) => res.json(await Note.find()));
app.post("/notes", async(req, res) => {
    const newNote = new Note({ text: req.body.text});
    await newNote.save()
        .then(() => console.log("Note added successfully"))
        .catch((err) => console.error(err));
    res.json(newNote);
})
app.delete("/notes/:id", async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});