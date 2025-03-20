const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
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
    try {
        const newNote = new Note({ text: req.body.text});
        const savedNote = await newNote.save();
        console.log("Note added successfully");
        res.json(savedNote);
    } catch (err) {
        console.error("Error adding note: ", err);
        res.status(500).json({error: "Internal server error"});
    }
    })
app.delete("/notes/:id", async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});