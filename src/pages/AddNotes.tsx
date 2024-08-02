import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "@clerk/clerk-react";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../configs/Firebase";

interface Note {
  title: string;
  body: string;
  userId: string;
  id: number;
}
export default function AddNotes() {
  const [body, setbody] = useState("");
  const [title, setTitle] = useState("untitled document");
  const [notes, setNotes] = useState<Note[]>([]);
  const { userId } = useAuth();

  const newNote = {
    title,
    body,
    userId: userId || "",
    id: Date.now(),
  };

  const addNote = async () => {
    await addDoc(collection(db, "notes"), newNote);
    setNotes([...notes, newNote]);
    setTitle("");
    setbody("");
  };

  return (
    <main>
      <Navbar />

      <section>
        <div className=" flex items-center justify-between">
          <input type="text" placeholder="Title" className="md:text-3xl font-bold text-slate-800 my-10 bg-transparent outline-none text-lg"  value={title} onChange=
          {(e) => setTitle(e.target.value)}
          spellCheck={false}
          />

          <button className="btn btn-sm btn-ghost btn-circle" onClick={addNote}>
            save
          </button>
        </div>
        <ReactQuill
          theme="snow"
          value={body}
          onChange={setbody}
          className="h-[calc(100dvh-260px)] rounded-xl custom-quill"
        />
      </section>
    </main>
  );
}
