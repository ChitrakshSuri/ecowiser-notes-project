import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-hot-toast"; // Import toast
import "./CreateNote.css";

const CreateNote = (props) => {
  const [isExpand, setIsExpand] = useState(false);
  const [note, setNotes] = useState({
    title: "",
    tagline: "",
    content: "",
  });

  const textareaRef = useRef(null); // Ref for the textarea
  const formRef = useRef(null); // Ref for the form

  const inputEvent = (event) => {
    const { name, value } = event.target;

    setNotes((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addEvent = async (event) => {
    event.preventDefault();

    // Validate fields before making API call
    if (!note.title || !note.tagline || !note.content) {
      toast.error("Please fill out all the fields.");
      return;
    }

    try {
      const { title, tagline, content } = note;
      const payload = {
        title,
        tagline,
        content,
        pinned: false, // Ensure the pinned attribute is always included
      };

      const res = await fetch(
        "https://eco-notes-25efe-default-rtdb.firebaseio.com/notesDataRecord.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        toast.success("Note added successfully!");

        // Reset note state
        setNotes({
          title: "",
          tagline: "",
          content: "",
        });

        setIsExpand(false); // Collapse back to initial state

        // Reset textarea height
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      } else {
        toast.error("Failed to add note. Please try again.");
      }
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("An error occurred while adding the note.");
    }
  };

  const expandIt = () => {
    setIsExpand(true); // Expand when clicking on the textarea
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setIsExpand(false); // Collapse the form when clicking outside
      resetTextareaHeight();
    }
  };

  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      setIsExpand(false); // Collapse the form on "Esc"
      resetTextareaHeight();
    }
  };

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to default
    }
  };

  useEffect(() => {
    // Add event listeners for click outside and keydown (Escape)
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      // Clean up the event listeners on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <div className="main_note" onDoubleClick={() => setIsExpand(false)} ref={formRef}>
      <div className="create-note-heading">Create a New Note</div>
      <form>
        {isExpand && (
          <>
            <input
              type="text"
              placeholder="Title"
              name="title"
              autoComplete="off"
              value={note.title}
              onChange={inputEvent}
            />
            <input
              type="text"
              placeholder="Tagline"
              name="tagline"
              autoComplete="off"
              value={note.tagline}
              onChange={inputEvent}
            />
          </>
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
  );
};

export default CreateNote;
