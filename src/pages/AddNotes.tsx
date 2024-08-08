import { useEffect, useState, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../components/layout/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useNotes } from "../context/NotesContext";
import { toast } from "react-toastify";

interface Note {
  id: string;
  title: string;
  body: string;
  userId: string;
}

export const AddEditNote = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { notes, addNote, updateNote } = useNotes();
  const [title, setTitle] = useState("untitled document");
  const [body, setBody] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const note = notes.find((note) => note.id === id);
    if (note) {
      setTitle(note.title);
      setBody(note.body);
      setIsEditing(true);
    }
  }, [id, notes]);

  const saveNote = async () => {
    const note: Note = {
      id: isEditing ? id! : Date.now().toString(),
      title,
      body,
      userId: userId || "",
    };

    if (!note.body) {
      toast.error("Cannot save empty note");
      return;
    }

    if (isEditing) {
      await updateNote(note.id, { title, body });
    } else {
      await addNote(note);
    }

    navigate("/notes");
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        saveNote();
      }
    },
    [title, body]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <main className="h-[105dvh]">
      <Navbar />
      <section>
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Title"
            className="md:text-3xl font-bold text-slate-800 my-10 bg-transparent outline-none text-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            spellCheck={false}
          />
          <button
            className="btn btn-sm btn-ghost btn-circle"
            onClick={saveNote}
          >
            save
          </button>
        </div>
        <ReactQuill
          theme="snow"
          value={body}
          onChange={setBody}
          placeholder="Write your notes..."
          className="h-[calc(100dvh-260px)] rounded-xl custom-quill"
        />
      </section>
    </main>
  );
};
