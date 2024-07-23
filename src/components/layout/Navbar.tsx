import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <header className="flex items-center justify-between py-6">
      {!isSignedIn && <Link to="/about" className="text-slate-600"> <button className="btn btn-ghost rounded-full font-normal text-base">About</button></Link> }

      <Link to='/'>
        <span  className="text-3xl font-bold text-slate-400 hover:text-slate-700">doIt.</span>
      </Link>


      {isSignedIn ? (
        <UserButton />
      ) : (
        <button className="bg-slate-200 py-2 px-6 rounded-full  font-normal hover:shadow-sm  border-none ">
          <SignInButton />
        </button>
      )}
    </header>
  );
}
