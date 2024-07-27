import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function Form() {
  const [input, setInput] = useState("");
  return (
    <form className="mt-auto absolute bottom-0 w-full py-5">
      <input
        type="text"
        className="input py-7 rounded-xl w-full bg-slate-200 text-black"
        placeholder="Let's brainstorm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <PaperPlaneIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-7 text-slate-400 cursor-pointer" />
    </form>
  );
}
