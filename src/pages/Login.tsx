import { Link } from "react-router-dom";
import useLogin from "../Functions/useLogin";

export default function Login() {
  const { state, handleInputChange, handleLogin } = useLogin();

  return (
    <main className="md:py-44 py-24">
      <div className="blue-shadow" />

      <div className="flex justify-center pb-5">
        <Link to="/">
          <span className="text-3xl font-bold text-slate-400 hover:text-slate-800">
            doIt.
          </span>
        </Link>
      </div>
      
      <form
        onSubmit={handleLogin}
        className="z-[100] flex flex-col max-w-[400px] mx-auto rounded-2xl bg-white py-10 px-6 shadow-md"
      >
        <h1 className="text-3xl text-slate-800 mb-3">Sign In</h1>
        <p className="text-slate-600 mb-6">Sign in if you already have an account.</p>

        <label htmlFor="email" className="sr-only">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="input bg-slate-100 rounded-xl"
          placeholder="Email"
          value={state.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password" className="sr-only">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="input my-2 bg-slate-100 rounded-xl"
          placeholder="Password"
          value={state.password}
          onChange={handleInputChange}
          required
        />

        {state.error && <p className="text-red-500 text-sm mt-2">{state.error}</p>}

        <button
          type="submit"
          className="py-3 rounded-xl bg-slate-900 text-white font-normal text-lg mt-5"
        >
          Sign In
        </button>

        <div className="text-slate-600 mt-10 flex flex-col gap-1">
          <p className="text-blue-700">Forgot your password?</p>
          <p>
            Don't have an account? <Link to="/sign-up" className="text-blue-700">Sign Up</Link>
          </p>
        </div>
      </form>
    </main>
  );
}
