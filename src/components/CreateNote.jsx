import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

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
            placeholder="Write a note...."
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
