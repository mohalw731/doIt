import useAddMailToWaitingList from "../../Hooks/useAddMailToWaitingList";

export default function CtaMail() {

  const {handleAddMailToWaitlist, email, setEmail} = useAddMailToWaitingList();

  return (
    <div className="md:py-32 pb-20">
      <form onSubmit={handleAddMailToWaitlist} className="space-y-6">
        <input
          type="text"
          className="md:text-5xl text-3xl active:border-none w-full bg-transparent focus:outline-none focus:border-none "
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="py-3 px-8 font-normal rounded-full text-white bg-[#1F2937] md:text-lg text-sm">
          Join the waitlist
        </button>
      </form>
    </div>
  );
}
