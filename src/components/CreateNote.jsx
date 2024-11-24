import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./CreateNote.css";

const Note = (props) => {
  const [isExpand, setIsExpand] = useState(false);
  const [note, setNotes] = useState({
    title: "",
    content: "",
  });

  const inputEvent = (event) => {
    const { name, value } = event.target;

    setNotes((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const addEvent = () => {
    props.passNote(note);
    setNotes({
      title: "",
      content: "",
    });
  };

  const expandIt = () => {
    setIsExpand(true);
  };

  const backToOriginal = () => {
    setIsExpand(false);
  };

  return (
    <>
      <div className="main_note" onDoubleClick={backToOriginal}>
        <div className="create-note-heading">Create a New Note </div>
        <form>
          {isExpand ? (
            <input
              type="text"
              placeholder="Title"
              name="title"
              autoComplete="off"
              value={note.title}
              onChange={inputEvent}
            />
          ) : null}

          <br />
          <textarea
            placeholder="Take a note..."
            rows=""
            coloum="1"
            name="content"
            value={note.content}
            onChange={inputEvent}
            onClick={expandIt}
          ></textarea>

          {isExpand ? (
            <Button onClick={addEvent}>
              <AddIcon className="plus_sign" />
            </Button>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default Note;
