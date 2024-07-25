import { useUser } from "@clerk/clerk-react";
import Welcome from "../layout/Welcome";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import lol from "../../assets/doitai.png";

export default function BrainstormLayout() {
  return (
    <main className="z-50 w-full h-[calc(100dvh-120px)] my-5">
      <section className="max-w-4xl h-full mx-auto relative py-5 flex flex-col">
        <div className="md:py-10 py-5">
          <Welcome />
        </div>

        {/* <ChatBox/> */}

        <form className="mt-auto absolute bottom-0 w-full py-5">
          <input
            type="text"
            className="input py-7 rounded-xl w-full bg-slate-200 text-black"
            placeholder="Let's brainstorm"
          />
          <PaperPlaneIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-7 text-slate-400 cursor-pointer" />
        </form>
      </section>
    </main>
  );
}

const ChatBox = () => {
  const { user } = useUser();

  return (
    <section className="flex-grow flex flex-col gap-14 overflow-y-auto pb-20">
      {/* user text */}
      <div className="flex flex-col md:flex-row md:gap-5 gap-3">
        <img src={user?.imageUrl} alt="" className="size-8 rounded-full" />
        <span className="bg-slate-600 text-white px-4 py-2 rounded-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quidem!
        </span>
      </div>

      {/* ai text */}
      <div className="flex flex-col md:flex-row md:gap-5 gap-3">
        <img src={lol} alt="" className="size-8 rounded-full" />
        <span className="py-2 rounded-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          quisquam fugit facilis? Quos, dolores. Iste repudiandae ea aut dolore
          nihil voluptatibus ex aliquid numquam distinctio, id doloremque
          sapiente omnis accusantium nam non consectetur ab impedit eveniet sed!
          Asperiores odio iure ad a, ex eum eaque nemo veritatis minima non
          ipsum.
        </span>
      </div>
    </section>
  );
};
