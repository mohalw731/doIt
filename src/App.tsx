import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Landing from "./pages/Landing";
import { useUser } from "@clerk/clerk-react";
import DashBoard from "./pages/DashBoard";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import Quill from "./pages/Quill";
// import Notes from "./pages/Notes";
import { AddEditNote } from "./pages/AddNotes";
import { NotesList } from "./components/notes/NotesList";


function App() {
  const { isSignedIn } = useUser();

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isSignedIn ? <DashBoard /> : <Landing />} />
          <Route path="/about" element={!isSignedIn ? <About /> : <DashBoard />} />
          <Route path="/quill" element={!isSignedIn ? <Landing /> : <Quill />} />
          <Route path="/notes" element={!isSignedIn ? <Landing /> : <NotesList />} />
          <Route path="/notes/add" element={!isSignedIn ? <Landing /> : <AddEditNote />} />
          <Route path="/notes/:id" element={!isSignedIn ? <Landing /> : <AddEditNote />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </main>
  );
}

export default App;
