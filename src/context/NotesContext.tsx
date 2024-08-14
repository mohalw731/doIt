import React, { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../configs/Firebase";
import useUserDetails from "../auth-functions/useUserDeatils";

interface Note {
  id: string;
  title: string;
  body: string;
  userId: string;
}

interface NotesContextType {
  notes: Note[];
  getNotes: () => void;
  addNote: (note: Note) => Promise<void>;
  updateNote: (id: string, note: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const { userDetails } = useUserDetails();
  const userId = userDetails?.uid;
  const [notes, setNotes] = useState<Note[]>([]);

  const getNotes = async () => {
    if (!userId) return;
    const notesQuery = query(
      collection(db, "notes"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(notesQuery);
    const notesData: Note[] = [];
    querySnapshot.forEach((doc) => {
      const note = doc.data() as Note;
      note.id = doc.id;
      notesData.push(note);
    });
    setNotes(notesData);
  };

  const addNote = async (note: Note) => {
    await addDoc(collection(db, "notes"), note);
    getNotes();
  };

  const updateNote = async (id: string, updatedNote: Partial<Note>) => {
    await updateDoc(doc(db, "notes", id), updatedNote);
    getNotes();
  };

  const deleteNote = async (id: string) => {
    await deleteDoc(doc(db, "notes", id));
    getNotes();
  };

  useEffect(() => {
    getNotes();
  }, [userId]);

  return (
    <NotesContext.Provider
      value={{ notes, getNotes, addNote, updateNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};
