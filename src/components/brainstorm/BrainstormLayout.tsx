import { useUser } from "@clerk/clerk-react";
import lol from "../../assets/doitai.png";
import { PaperPlaneIcon, SymbolIcon } from "@radix-ui/react-icons";
import Welcome from "../layout/Welcome";
import ReactMarkdown from "react-markdown";
import { useChat } from "../../context/ChatContext";
import useGeminiAi from "../../Hooks/useGeminiAi";
import { useEffect } from "react";
import useAdjustHeight from "../../Hooks/useAdjustHeight";
import remarkGfm from 'remark-gfm';  // Import GitHub flavored markdown

const BrainstormLayout = () => {
  const { user } = useUser();
  const { messages, clearMessages } = useChat();
  const { input, setInput, loading, run, error } = useGeminiAi();
  const { textareaRef, adjustTextareaHeight } = useAdjustHeight();

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  return (
    <main className="z-50 w-full h-[calc(100dvh-120px)] my-5">
      <section className="max-w-6xl h-full mx-auto relative py-5 flex flex-col">
        {messages.length === 0 && (
          <div className="md:py-10">
            <Welcome />
          </div>
        )}

        <section className="flex-grow flex conversation-container flex-col-reverse gap-3 pb-36 overflow-y-auto">
          {error && (
            <div className="flex justify-center items-center">
              <p className="text-red-500">Something went wrong</p>
            </div>
          )}
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
                    message.isUser ? "md:items-start items-end flex-col-reverse" : ""
                  }`}
                >
                  {message.isUser ? (
                    <>
                      <span
                        className={`px-4 py-2 rounded-xl max-w-2xl bg-slate-600 text-white`}
                        style={{ overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word' }}
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                      </span>
                      <img
                        src={user?.imageUrl || ""}
                        alt="User avatar"
                        className="size-8 rounded-full"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={lol}
                        alt="AI avatar"
                        className="size-8 rounded-full"
                      />
                      <span
                        className={`py-2 px-4 rounded-xl max-w-2xl bg-transparent tracking-wide`}
                        style={{ overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word' }}
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                      </span>
                    </>
                  )}
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
          className="mt-auto absolute bottom-0 w-full md:py-5 flex items-center"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            className="textarea py-4 rounded-xl w-full bg-slate-200 text-black overflow-y-auto resize-none"
            placeholder="Let's brainstorm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ height: 'auto', maxHeight: '150px' }}
          />
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
