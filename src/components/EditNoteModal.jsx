import React, { useState, useEffect } from "react";
import "./EditNoteModal.css";

const EditNoteModal = ({ note, onClose, onSave }) => {
  const [title, setTitle] = useState(note.title);
  const [tagline, setTagline] = useState(note.tagline);
  const [content, setContent] = useState(note.content);

  // Close modal on Esc key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose(); // Close modal when Esc is pressed
      }
    };

    // Add event listener for the keydown event
    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleSave = () => {
    onSave({ ...note, title, tagline, content }); // Save the updated note
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose} // Close the modal when clicking on the overlay
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent propagation of the click event
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="Tagline"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        ></textarea>
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
