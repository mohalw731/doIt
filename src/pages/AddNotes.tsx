import { useState, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import Navbar from "../components/layout/Navbar";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../configs/Firebase";
import { MagicWandIcon, TimerIcon } from "@radix-ui/react-icons";
import useUserDetails from "../auth-functions/useUserDeatils";
import _ from "lodash";

export default function AddEditNote() {
  const [value, setValue] = useState("");
  const [highlightedText, setHighlightedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("Untitled Document");
  const { userDetails } = useUserDetails();
  const { id } = useParams<{ id: string }>();
  const uid = userDetails?.uid;

  useEffect(() => {
    if (id) {
      const noteRef = doc(db, "notes", id);

      // Set up a real-time listener for the note document
      const unsubscribe = onSnapshot(noteRef, (doc) => {
        if (doc.exists()) {
          const noteData = doc.data();
          setTitle(noteData.title);
          setValue(noteData.body);
        } else {
          setError("Note not found");
          setTimeout(() => setError(""), 3000);
        }
      });

      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }
  }, [id]);

  useEffect(() => {
    const handleSelectionChange = () => {
      if (typeof window !== "undefined" && window.getSelection) {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
          const selectedText = selection.toString();
          setHighlightedText(selectedText);
        }
      }
    };

    document.addEventListener("mouseup", handleSelectionChange);
    document.addEventListener("keyup", handleSelectionChange);
    return () => {
      document.removeEventListener("mouseup", handleSelectionChange);
      document.removeEventListener("keyup", handleSelectionChange);
    };
  }, []);

  const handleAigen = async () => {
    setLoading(true);
    if (highlightedText) {
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: highlightedText }],
            max_tokens: 100,
          },
          {
            headers: {
              Authorization: `Bearer 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`,
              "Content-Type": "application/json",
            },
          }
        );

        const generatedText = response.data.choices[0].message.content;
        setValue((prev) => `${prev}${generatedText}`);
        setLoading(false);
      } catch (error) {
        setError("Error generating text: " + error);
        setLoading(false);
        setTimeout(() => setError(""), 3000);
      }
    } else {
      setError("No text selected");
      setLoading(false);
      setTimeout(() => setError(""), 3000);
    }
  };

  const saveNote = useCallback(
    _.debounce(async (updatedValue, updatedTitle) => {
      if (!updatedValue.trim()) {
        setError("Cannot save an empty note");
        setTimeout(() => setError(""), 3000);
        return;
      }

      try {
        if (id) {
          const noteRef = doc(db, "notes", id);
          await updateDoc(noteRef, { title: updatedTitle, body: updatedValue });
        } else {
          const newNote = {
            title: updatedTitle,
            body: updatedValue,
            userId: uid || "",
          };
          await addDoc(collection(db, "notes"), newNote);
        }
      } catch (error) {
        setError("Error saving note: " + error);
        setTimeout(() => setError(""), 3000);
      }
    }, 1000),
    [id, uid]
  );

  const handleContentChange = (content: string) => {
    setValue(content);
    saveNote(content, title);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    saveNote(value, newTitle);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-[1200px] mx-auto  flex flex-col">
        <div className="pb-6 flex  justify-between items-center">
          <input
            type="text"
            className="font-bold bg-transparent md:text-3xl text-base outline-none"
            placeholder="Untitled Document"
            value={title}
            onChange={handleTitleChange}
          />
          <div className="flex  items-center gap-2">
            <button
              className="btn btn-circle btn-ghost text-slate-600"
              onClick={loading ? () => {} : handleAigen}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <MagicWandIcon className="size-6" />
              )}
            </button>

            <button className="btn btn-circle btn-ghost hover:bg-slate-200">
              <TimerIcon className="size-6 text-slate-600" />
            </button>

            <button
              className="hover:bg-slate-200 px-3 py-1 rounded"
              onClick={() => saveNote(value, title)}
            >
              Save
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 text-center mb-5">{error}</p>}
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleContentChange}
          className="flex-1  custom-quill rounded-xl mb-10"
        />
      </main>
    </>
  );
}
