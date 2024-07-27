import { useUser } from "@clerk/clerk-react";
import lol from "../../assets/doitai.png";

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

  
  export default ChatBox