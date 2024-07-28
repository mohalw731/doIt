// components/brainstorm/BrainstormLayout.tsx
import { useUser } from "@clerk/clerk-react";
import lol from "../../assets/doitai.png";
import Welcome from "../layout/Welcome";
import { useChat } from "../../context/ChatContext";
import useGeminiAi from "../../Hooks/useGeminiAi";
import { useEffect } from "react";
import useAdjustHeight from "../../Hooks/useAdjustHeight";
import DropdownSelector from "./DropdownSelector";
import MessageList from "./MessageList";
import InputForm from "./InputForm";

type AIType = 'default' | 'marketer' | 'assistant' | 'programmer' | 'seo-specialist';

const BrainstormLayout = () => {
  const { user } = useUser();
  const { messages, clearMessages } = useChat();
  const { input, setInput, loading, run, error, setContext, autoMessage } = useGeminiAi();
  const { textareaRef, adjustTextareaHeight } = useAdjustHeight();

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value as AIType;

    const aiContexts: Record<AIType, string> = {
      default: '',
      marketer: 'You are an expert marketer.',
      assistant: 'You are a professional assistant.',
      programmer: 'You are an expert programmer.',
      'seo-specialist': 'You are an SEO specialist.'
    };

    const initialPrompts: Record<AIType, string> = {
      marketer: 'What about marketing do you need help with?',
      assistant: 'How can I assist you today?',
      programmer: 'What programming question do you have?',
      'seo-specialist': 'What SEO concerns do you need help with?',
      default: '' // Adding default to initialPrompts for consistency
    };

    setContext(aiContexts[selectedType]);
    autoMessage(initialPrompts[selectedType]);
  };

  return (
    <main className="z-50 w-full h-[calc(100dvh-120px)] my-5">
      <section className="max-w-6xl h-full mx-auto relative py-5 flex flex-col">
        {messages.length === 0 && (
          <div className="md:py-10">
            <Welcome />
            <DropdownSelector onSelectChange={handleSelectChange} />
          </div>
        )}
        <section className="flex-grow flex conversation-container flex-col-reverse gap-3 pb-36 overflow-y-auto">
          {error && (
            <div className="flex justify-center items-center">
              <p className="text-red-500">Something went wrong</p>
            </div>
          )}
          <MessageList messages={messages} userAvatarUrl={user?.imageUrl || ""} aiAvatarUrl={lol} />
          {loading && (
            <div className="flex justify-start gap-3">
              <span className="py-2 px-4 rounded-xl bg-slate-200">Loading...</span>
            </div>
          )}
        </section>
        <InputForm
          input={input}
          setInput={setInput}
          run={run}
          clearMessages={clearMessages}
          textareaRef={textareaRef}
        />
      </section>
    </main>
  );
};

export default BrainstormLayout;
