import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { useState } from "react";

export default function Navbar() {
  const { isSignedIn } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <header className="flex items-center justify-between py-6 z-50">
        <div className="blue-shadow max-w-7xl mx-auto" />
        {!isSignedIn ? (
          <Link to="/about" className="text-slate-600">
            <button className="btn btn-ghost rounded-full font-normal text-base">
              About
            </button>
          </Link>
        ) : (
          <button className="md:hidden" >
            <label className="btn btn-circle btn-ghost swap swap-rotate" >
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
          <span className="text-3xl font-bold text-slate-500 hover:text-slate-800">
            doIt.
          </span>
        </Link>

      <nav className=" gap-5 hidden md:flex">
        <Link to="/" className="text-slate-600">
            <button className="btn btn-ghost rounded-full font-normal text-base">
              Home
            </button>
          </Link>

          <Link to="/brainstorm" className="text-slate-600">
            <button className="btn btn-ghost rounded-full font-normal text-base">
              Brainstorm AI
            </button>
          </Link>
      </nav>

        {isSignedIn ? (
          <UserButton />
        ) : (
          <button className="bg-slate-200 py-2 px-6 rounded-full  font-normal hover:shadow-sm  border-none ">
            <SignInButton />
          </button>
        )}
      </header>

      {isOpen && <Menu />}
    </div>
  );
}
