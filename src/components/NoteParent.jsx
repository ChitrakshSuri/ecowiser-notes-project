import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CreateNote from "./CreateNote";
import Note from "./Note";
import "./NoteParent.css";

const ITEMS_PER_PAGE = 6; // Maximum notes per page

function NoteParent() {
  const [addItem, setAddItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const addNote = (note) => {
    setAddItem((prevData) => {
      const lastPinnedIndex = prevData.findIndex((item) => !item.pinned);

      if (lastPinnedIndex === -1) {
        return [...prevData, { ...note, id: uuidv4(), pinned: false }];
      }

      return [
        ...prevData.slice(0, lastPinnedIndex),
        { ...note, id: uuidv4(), pinned: false },
        ...prevData.slice(lastPinnedIndex),
      ];
    });
  };

  const onDelete = (id) => {
    setAddItem((oldData) => oldData.filter((note) => note.id !== id));
  };

  const togglePin = (id) => {
    setAddItem((oldData) =>
      oldData.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
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

  // const year = new Date().getFullYear(); 

  return (
    <div>
      <CreateNote passNote={addNote} />

      <div className="carousel">
        {paginatedNotes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            deleteItem={onDelete}
            pinItem={togglePin}
            isPinned={note.pinned}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={prevPage}>&lt; Prev</button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button onClick={nextPage}>Next &gt;</button>
        </div>
      )}

      {/* <footer className="footer">
        <p>&copy; {year} Eco Notes. All rights reserved.</p>
      </footer> */}
    </div>
  );
}

export default NoteParent;