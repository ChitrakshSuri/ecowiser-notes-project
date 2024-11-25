import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./Note.css";

const Note = (props) => {
  const deleteNote = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      props.deleteItem(props.id);
    }
  };

  return (
    <>
      <div className="note">
        <h1> {props.title} </h1>
        <br />
        <p>{props.content} </p>
        <button onClick={deleteNote} className="btn">
          <DeleteOutlineIcon className="deleteIcon" />
        </button>
      </div>
    </>
  );
};

export default Note;
