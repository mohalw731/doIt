import { useUser } from "@clerk/clerk-react";
import lol from "../../assets/doitai.png";
import { PaperPlaneIcon, SymbolIcon } from "@radix-ui/react-icons";
import Welcome from "../layout/Welcome";
import ReactMarkdown from "react-markdown";
import { useChat } from "../../context/ChatContext";
import useGeminiAi from "../../Hooks/useGeminiAi";

const BrainstormLayout = () => {
  const { user } = useUser();
  const { messages, clearMessages } = useChat();
  const { input, setInput, loading, run } = useGeminiAi();

  return (
    <main className="z-50 w-full h-[calc(100dvh-120px)] my-5">
      <section className="max-w-6xl h-full mx-auto relative py-5 flex flex-col">
        {messages.length === 0 && (
          <div className="py-10">
            <Welcome />
          </div>
        )}

        <section className="flex-grow flex conversation-container flex-col-reverse gap-3 pb-36 overflow-y-auto">
          <div className="flex-grow flex flex-col gap-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex md:flex-row flex-col gap-2 items-start ${
                    message.isUser ? "items-end" : "items-start"
                  }`}
                >
                  <img
                    src={message.isUser ? user?.imageUrl || "" : lol}
                    alt={message.isUser ? "User avatar" : "AI avatar"}
                    className="size-8 rounded-full"
                  />
                  <span
                    className={`py-2 px-4 rounded-xl text-sm md:text-base max-w-2xl ${
                      message.isUser
                        ? "bg-slate-600 text-white"
                        : "bg-transparent tracking-wide"
                    }`}
                  >
                    {message.isUser ? (
                      message.text
                    ) : (
                      <ReactMarkdown className='text-sm md:text-base'>{message.text}</ReactMarkdown>
                    )}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start gap-3">
                <span className="py-2 px-4 rounded-xl bg-slate-200">
                  Loading...
                </span>
              </div>
            )}
          </div>
        </section>

        <form
          onSubmit={run}
          className="mt-auto absolute bottom-0 w-full py-5 flex items-center"
        >
          <input
            type="text"
            className="input py-7 rounded-xl w-full bg-slate-200 text-black pr-14"
            placeholder="Let's brainstorm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="bg-slate-200 absolute right-10 w-14 h-7 top-[35px] z-[100]" />
          <PaperPlaneIcon
            className="absolute right-5 top-1/2 z-[101] -translate-y-1/2 size-6 text-slate-400 cursor-pointer"
            onClick={run}
          />
          <SymbolIcon
            className="absolute z-[101] bg-slate-200 right-16 top-1/2 -translate-y-1/2 size-6 text-slate-400 cursor-pointer"
            onClick={clearMessages}
          />
        </form>
      </section>
    </main>
  );
};

export default BrainstormLayout;
