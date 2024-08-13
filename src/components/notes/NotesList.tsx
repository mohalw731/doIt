import React from "react";
import Navbar from "../../components/layout/Navbar";

import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@radix-ui/react-icons";
import { useNotes } from "../../context/NotesContext";
import { NoteCard } from "./NoteCard";
import useUserDetails from "../../Functions/useUserDeatils";

export const NotesList: React.FC = () => {
  const { userDetails } = useUserDetails();
  const navigate = useNavigate();
  const { notes } = useNotes();
  const name = userDetails?.name.split(" ");
  const firstName = name ? name[0] : "";

  return (
    <main className="z-50 bg-slate-100">
      <Navbar />
      <section className="mb-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="md:text-3xl font-bold text-slate-800 my-10 text-xl">
            {firstName}'s notes
          </h1>
          <button
            className="btn btn-sm btn-ghost btn-circle"
            onClick={() => navigate("/notes/add")}
          >
            <PlusIcon className="size-7 text-slate-400 hover:text-slate-600" />
          </button>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </ul>

        {notes.length === 0 && (
          <p className="text-center text-slate-400 py-32">
            You don't have any notes yet.
          </p>
        )}
      </section>
    </main>
  );
};
