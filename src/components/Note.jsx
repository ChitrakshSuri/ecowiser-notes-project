import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PushPinIcon from "@mui/icons-material/PushPin";
import "./Note.css";

const Note = (props) => {
  const { title, content, id, deleteItem, pinItem, isPinned } = props;

  const deleteNote = () => {
    const confirmationMessage = isPinned
      ? "Are you sure you want to delete this PINNED note?"
      : "Are you sure you want to delete this note?";

    if (window.confirm(confirmationMessage)) {
      deleteItem(id); // Use the unique ID
    }
  };

  const togglePin = () => {
    pinItem(id);
  };

  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <div className="note-actions">
        <button onClick={togglePin} className="btn pin-btn">
          <PushPinIcon className={isPinned ? "pinned" : ""} />
        </button>
        <button onClick={deleteNote} className="btn delete-btn">
          <DeleteOutlineIcon className="deleteIcon" />
        </button>
      </div>
    </div>
  );
};

export default Note;
