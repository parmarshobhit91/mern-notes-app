import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:3000/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setNotes(res.data));
  }, []);

  const addNote = () => {
    axios.post(API_URL, { text }).then((res) => {
      setNotes([...notes, res.data]);
      setText("");
    });
  };

  const deleteNote = (id) => {
    axios.delete(`${API_URL}/${id}`).then(()=>{
      setNotes(notes.filter((note) => note._id !== id));
    });
  };

  return (
    <div style={{textAlign: "center", padding: "20px"}}>
      <h2>Notes App</h2>
      <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Enter a note"
      />
      <button onClick={addNote}>Add Note</button>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            {note.text} <button onClick={ () => deleteNote(note._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App;