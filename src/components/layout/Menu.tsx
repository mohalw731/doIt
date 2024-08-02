import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate()
  return (
    <>
        <ul className="menu absolute bg-slate-200 border shadow-xl top-[5rem] border-slate-200 rounded-box  left-0 right-0 w-[100%] max-w-7xl mx-auto  py-7 z-[999] md:hidden">
        <li onClick={() => navigate("/")}>
          <a className="text-xl text-slate-800">Home</a>
        </li>
        <li onClick={() => navigate("/quill")}>
          <a className="text-xl text-slate-800">Quill AI</a>
        </li>
        <li onClick={() => navigate("/notes")}>
          <a className="text-xl text-slate-800">Notes</a>
        </li>
      </ul>
    </>
  );
}

