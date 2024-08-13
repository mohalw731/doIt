import { Link } from "react-router-dom";

export default function Register() {
  return (
    <main className="md:py-44 py-24">
      <span className="blue-shadow" />

      <div className="flex justify-center pb-5">
        <Link to="/">
          <span className="text-3xl font-bold text-slate-400 hover:text-slate-800">
            doIt.
          </span>
        </Link>
      </div>
      <form
        action=""
        className="z-[100] flex flex-col max-w-[400px] mx-auto rounded-2xl bg-white py-10 px-6 shadow-md"
      >
        <h1 className="text-3xl text-slate-800 mb-3">Sign up</h1>
        <p className="text-slate-600 ">
          Create an account and start using doIt
        </p>
        <input
          type="text"
          className="input bg-slate-100 mt-10 rounded-xl"
          placeholder="Name"
        />
        <input
          type="email"
          className="input bg-slate-100 mt-2 rounded-xl"
          placeholder="Email"
        />
        <input
          type="password"
          className="input mt-2 mb-7 bg-slate-100 rounded-xl"
          placeholder="Password"
        />
        <button className="py-3 rounded-xl bg-slate-900 text-white font-normal text-lg">
          Sign up
        </button>

        <div className="text-slate-600 mt-10 flex flex-col gap-1">
          <p className="text-blue-700">Forgot your password?</p>
          <p>
            Do you have an account?{" "}
            <Link to="/sign-in" className="text-blue-700">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
