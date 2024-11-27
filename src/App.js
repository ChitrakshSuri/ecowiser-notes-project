import Home from "./components/Home";
import Header from "./components/Header";

import NoteParent from "./components/NoteParent";
import "./App.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Header />
      <Home />
      <NoteParent />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
