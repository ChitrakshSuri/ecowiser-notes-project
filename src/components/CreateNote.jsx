import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./CreateNote.css";

const CreateNote = (props) => {
  const [isExpand, setIsExpand] = useState(false);
  const [note, setNotes] = useState({
    title: "",
    content: "",
  });

  const textareaRef = useRef(null); // Ref for the textarea

  const inputEvent = (event) => {
    const { name, value } = event.target;

    setNotes((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addEvent = () => {
    if (!note.title || !note.content) {
      alert("Please fill out both the title and content.");
      return;
    }

    props.passNote(note);
    setNotes({
      title: "",
      content: "",
    });

    setIsExpand(false); // Collapse back to initial state

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const expandIt = () => {
    setIsExpand(true); // Expand when clicking on the textarea
  };

  return (
    <>
      <div className="main_note" onDoubleClick={() => setIsExpand(false)}>
        <div className="create-note-heading">Create a New Note</div>
        <form>
          {isExpand && (
            <input
              type="text"
              placeholder="Title"
              name="title"
              autoComplete="off"
              value={note.title}
              onChange={inputEvent}
            />
          )}

          <br />
          <textarea
            ref={textareaRef}
            placeholder="Take a note..."
            rows="1"
            name="content"
            value={note.content}
            onChange={inputEvent}
            onClick={expandIt}
            onInput={(e) => {
              e.target.style.height = "auto"; // Reset height to adjust
              e.target.style.height = `${e.target.scrollHeight}px`; // Adjust to content
            }}
          ></textarea>

          {isExpand && (
            <Button onClick={addEvent}>
              <AddIcon className="plus_sign" />
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default CreateNote;
