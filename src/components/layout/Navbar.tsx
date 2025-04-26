import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import useUserDetails from "../../auth-functions/useUserDeatils";
import useLogout from "../../auth-functions/useLogout";

export default function Navbar() {
  const { isLoggedIn, userDetails } = useUserDetails();
  const { handleSignOut } = useLogout();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const bageLetter = userDetails?.name.toUpperCase().substring(0, 1);
  const navigate = useNavigate();

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
          <Link to="/">
            <span className="text-3xl font-bold text-slate-400 hover:text-slate-800">
              doIt.
            </span>
          </Link>
        )}

        {!isLoggedIn && (
          <Link to="/">
            <span className="text-3xl font-bold text-slate-400 hover:text-slate-800">
              doIt.
            </span>
          </Link>
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
