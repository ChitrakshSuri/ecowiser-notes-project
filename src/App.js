import Home from "./components/Home";
import Header from "./components/Header";
// import { Toaster } from "@/components/ui/toaster"

import NoteParent from "./components/NoteParent";
import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <Home />
      <NoteParent />

    </>
  );
};

export default App;
