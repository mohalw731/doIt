import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { useState } from "react";
import useUserDetails from "../../auth-functions/useUserDeatils";
import useLogout from "../../auth-functions/useLogout";

export default function Navbar() {
  const { isLoggedIn, userDetails } = useUserDetails();

  const { handleSignOut } = useLogout();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const bageLetter = userDetails?.name.toUpperCase().substring(0, 1);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <header className="flex items-center justify-between py-5 z-50">
        <div className="blue-shadow max-w-7xl mx-auto" />
        {!isLoggedIn ? (
          <Link to="/about" className="text-slate-600">
            <button className="btn btn-ghost rounded-full font-normal text-base text-slate-600">
              About
            </button>
          </Link>
        ) : (
          <button className="md:hidden">
            <label className="btn btn-circle btn-ghost swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" onChange={toggleMenu} />

              {/* hamburger icon */}
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>

              {/* close icon */}
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
          </button>
        )}

        <Link to="/">
          <span className="text-3xl font-bold text-slate-400 hover:text-slate-800">
            doIt.
          </span>
        </Link>

        {isLoggedIn && (
          <nav className=" gap-5 hidden md:flex">
            <Link to="/" className="text-slate-600">
              <button className="btn btn-ghost rounded-full font-normal text-base text-slate-600">
                Home
              </button>
            </Link>

            <Link to="/notes" className="text-slate-600">
              <button className="btn btn-ghost rounded-full font-normal text-base text-slate-600">
                Notes
              </button>
            </Link>

            <Link to="/quill" className="text-slate-600">
              <button className="btn btn-ghost rounded-full font-normal text-base text-slate-600">
                Quill AI
              </button>
            </Link>
          </nav>
        )}

        {isLoggedIn ? (
          <button
            className="btn-circle size-8 bg-slate-300 rounded-full font-normal text-base text-slate-600"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <span>{bageLetter}</span>
          </button>
        ) : (
          <Link
            to="/sign-in"
            className="bg-slate-200 py-2 px-6 rounded-full  font-normal hover:shadow-sm  border-none text-slate-600 "
          >
            Sign in
          </Link>
        )}
      </header>

      {isOpen && <Menu />}
      {isProfileMenuOpen && (
        <ul className="absolute bg-slate-200 border shadow-xl  max-w-[12rem] flex flex-col gap-2 border-slate-200 rounded-box   w-[100%] right-0 top-16  p-2 z-[999]">
          <li
            className="text-slate-800 py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-300 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            Profile
          </li>
          <li
            className="text-red-500 py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-300 cursor-pointer"
            onClick={handleSignOut}
          >
            Signout
          </li>
        </ul>
      )}
    </div>
  );
}
