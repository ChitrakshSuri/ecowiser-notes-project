import React, { useState } from "react";
import { toast } from "react-hot-toast"; // Import the toast function
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PushPinIcon from "@mui/icons-material/PushPin";
import "./Note.css";

const Note = (props) => {
  const { title, tagline, content, id, deleteItem, pinItem, isPinned } = props;

  const [animationClass, setAnimationClass] = useState("");

  const deleteNote = (event) => {
    event.stopPropagation(); // Prevent triggering onEdit

    // Triggering a toast notification for delete action
    toast.success(isPinned ? "Pinned note deleted!" : "Note deleted!");

    // Add the delete animation and then delete the item
    setAnimationClass("delete");
    setTimeout(() => deleteItem(id), 300); // Wait for animation before deletion
  };

  const togglePin = (event) => {
    event.stopPropagation(); // Prevent triggering onEdit
    setAnimationClass(isPinned ? "unpinned" : "pinned");
    setTimeout(() => pinItem(id), 300); // Trigger pin/unpin after animation
  };

  return (
    <div
      className={`note ${isPinned ? "pinned" : ""} ${animationClass}`}
      onClick={() => props.onEdit()}
    >
      <h1>{title}</h1>
      <h3>{tagline}</h3>
      <hr />
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
