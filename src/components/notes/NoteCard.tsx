import { TrashIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../../context/NotesContext";

interface Note {
  id: string;
  title: string;
  body: string;
}

interface NoteCardProps {
  note: Note;
}

export const NoteCard = ({ note }: NoteCardProps) => {
  const navigate = useNavigate();
  const { deleteNote } = useNotes();

  const handleNoteClick = () => {
    navigate(`/notes/${note.id}`);
  };

  return (
    <li className="w-full max-w-md min-h-52 p-7 rounded-xl border flex flex-col gap-3 cursor-pointer hover:bg-slate-200">
      <div className="flex justify-between items-center">
        <h2
          className="text-xl font-semibold text-slate-800"
          onClick={handleNoteClick}
        >
          {note.title}
        </h2>
        <TrashIcon
          className="text-slate-400 hover:text-slate-600 size-6 cursor-pointer"
          onClick={() => deleteNote(note.id)}
        />
      </div>
      <p className="text-slate-400">
        {note.body
          .replace(/<[^>]+>/g, "")
          .split(" ")
          .slice(0, 15)
          .join(" ")}
        ...
      </p>
    </li>
  );
};
