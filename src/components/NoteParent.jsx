import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// Import uuid for uniquely identifing the note
import CreateNote from "./CreateNote";
import Note from "./Note";
import "./NoteParent.css";

function NoteParent() {
  const [addItem, setAddItem] = useState([]);

  const addNote = (note) => {
    setAddItem((prevData) => {
      return [...prevData, { ...note, id: uuidv4(), pinned: false }]; // Assign unique ID
    });
  };

  const onDelete = (id) => {
    setAddItem((oldData) => oldData.filter((note) => note.id !== id)); // Filter by unique ID
  };

  const togglePin = (id) => {
    setAddItem((oldData) =>
      oldData.map(
        (note) => (note.id === id ? { ...note, pinned: !note.pinned } : note) // Toggle pin based on unique ID
      )
    );
  };

  // Sort notes to have pinned ones first
  const sortedNotes = [...addItem].sort((a, b) => b.pinned - a.pinned);

  return (
    <div>
      <CreateNote passNote={addNote} />

      {sortedNotes.map((val) => (
        <Note
          key={val.id} // Use unique ID as key
          id={val.id} // Pass unique ID
          title={val.title}
          content={val.content}
          deleteItem={onDelete}
          pinItem={togglePin}
          isPinned={val.pinned}
        />
      ))}
    </div>
  );
}

export default NoteParent;
