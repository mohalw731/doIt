import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate()
  return (
    <>
        <ul className="menu absolute bg-slate-200 border shadow-xl top-[5rem] border-slate-200 rounded-box  left-0 right-0 w-[100%] max-w-7xl mx-auto  py-7 z-[999] md:hidden">
        <li onClick={() => navigate("/")}>
          <a>Home</a>
        </li>
        <li onClick={() => navigate("/brainstorm")}>
          <a>Brainstorm</a>
        </li>
      </ul>
    </>
  );
}

