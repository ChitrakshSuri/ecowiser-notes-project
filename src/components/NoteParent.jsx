import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CreateNote from "./CreateNote";
import Note from "./Note";
import EditNoteModal from "./EditNoteModal";
import { toast } from "react-hot-toast";
import "./NoteParent.css";

const dbUrl =
  "https://eco-notes-25efe-default-rtdb.firebaseio.com/notesDataRecord.json";

const ITEMS_PER_PAGE = 6;

function NoteParent() {
  const [addItem, setAddItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedNote, setSelectedNote] = useState(null); // Track the note being edited

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(dbUrl);
        const data = await res.json();
        const notes = data
          ? Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
              pinned: false,
            }))
          : [];

        // Avoid duplicate notes
        setAddItem((prevData) => {
          const updatedNotes = [...prevData];
          notes.forEach((newNote) => {
            if (!updatedNotes.find((note) => note.id === newNote.id)) {
              updatedNotes.push(newNote);
            }
          });
          return updatedNotes;
        });
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [addItem]);

  const addNote = async (note) => {
    const newNote = {
      ...note,
      pinned: note.pinned !== undefined ? note.pinned : false, // Set pinned only if it's not defined
    };

    try {
      const res = await fetch(dbUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      if (res.ok) {
        const noteData = await res.json();
        setAddItem((prevData) => [
          ...prevData,
          { ...newNote, id: noteData.name }, // Firebase generates an id
        ]);
      } else {
        console.error("Error adding note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      const res = await fetch(
        `https://eco-notes-25efe-default-rtdb.firebaseio.com/notesDataRecord/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setAddItem((oldData) => oldData.filter((note) => note.id !== id));
        toast.success("Note deleted!");
      } else {
        console.error("Error deleting note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const togglePin = async (id) => {
    setAddItem((oldData) =>
      oldData.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
    try {
      const noteToUpdate = addItem.find((note) => note.id === id);
      await fetch(
        `https://eco-notes-25efe-default-rtdb.firebaseio.com/notesDataRecord/${id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pinned: !noteToUpdate.pinned }),
        }
      );
    } catch (error) {
      console.error("Error toggling pin:", error);
    }
  };

  const openEditModal = (note) => {
    setSelectedNote(note); // Set the selected note for editing
  };

  const closeEditModal = () => {
    setSelectedNote(null); // Close the modal
  };

  const updateNote = async (updatedNote) => {
    try {
      await fetch(
        `https://eco-notes-25efe-default-rtdb.firebaseio.com/notesDataRecord/${updatedNote.id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedNote),
        }
      );
      setAddItem((oldData) =>
        oldData.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
      closeEditModal();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const sortedNotes = [...addItem].sort((a, b) => b.pinned - a.pinned);

  const totalPages = Math.ceil(sortedNotes.length / ITEMS_PER_PAGE);

  const paginatedNotes = sortedNotes.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div>
      <CreateNote passNote={addNote} />

      <div className="carousel">
        {paginatedNotes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            tagline={note.tagline}
            content={note.content}
            deleteItem={onDelete}
            pinItem={togglePin}
            isPinned={note.pinned}
            onEdit={() => openEditModal(note)} // Pass openEditModal
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={prevPage}
            disabled={currentPage === 0} // Disable Prev button when on the first page
            className={currentPage === 0 ? "disabled" : ""}
          >
            &lt; Prev
          </button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button onClick={nextPage}>Next &gt;</button>
        </div>
      )}

      {selectedNote && (
        <EditNoteModal
          note={selectedNote}
          onClose={closeEditModal}
          onSave={updateNote}
        />
      )}
    </div>
  );
}

export default NoteParent;
