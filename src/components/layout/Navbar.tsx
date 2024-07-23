import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <header className="flex items-center justify-between py-6">
      {!isSignedIn && <Link to="/about" className="text-slate-600"> About</Link>}

      <Link to='/'>
        <span  className="text-3xl font-bold text-slate-400 hover:text-slate-700">doIt.</span>
      </Link>


      {isSignedIn ? (
        <UserButton />
      ) : (
        <button className="bg-slate-300 py-2 px-6 rounded-full btn btn-sm font-medium  border-none hover:bg-slate-400 hover:text-white">
          <SignInButton />
        </button>
      )}
    </header>
  );
}
