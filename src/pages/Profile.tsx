import Navbar from "../components/layout/Navbar";
import useUserDetails from "../auth-functions/useUserDeatils";

export default function Profile() {
  const { userDetails } = useUserDetails();
  return (
    <main className="z-[999] h-[calc(100vh-64px)]">
      <Navbar />
      <div className=" bg-slate-50 z-[999] py-12 px-5 rounded-xl flex flex-col max-w-3xl mx-auto md:mt-32 mt-24">
        <div className=" flex md:flex-row flex-col items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800 mb-5">Profile</h1>
          <span className="mb-5 text-slate-400">
            editing is not available right now
          </span>
        </div>
        <div className=" flex flex-col ">
          <span>Name</span>
          <input
            className="md:text-xl md:p-5 p-4 outline-none hover:bg-slate-200 cursor-pointer bg-slate-100 rounded-xl mt-2 mb-8"
            type="email"
            value={userDetails?.name}
            disabled
          />
          <span>Email</span>
          <input
            className="md:text-xl md:p-5 p-4 outline-none hover:bg-slate-200 cursor-pointer bg-slate-100 rounded-xl mt-2 mb-8"
            type="email"
            value={userDetails?.email}
            disabled
          />
          <span>Password</span>
          <input
            className="md:text-xl md:p-5 p-4 outline-none hover:bg-slate-200 cursor-pointer bg-slate-100 rounded-xl mt-2"
            type="password"
            value={userDetails?.password}
            disabled
          />
        </div>
      </div>
    </main>
  );
}
