// components/InputForm.tsx
import React, { useCallback } from "react";
import { PaperPlaneIcon, SymbolIcon } from "@radix-ui/react-icons";

interface InputFormProps {
  input: string;
  setInput: (value: string) => void;
  run: (e: React.FormEvent) => void;
  clearMessages: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const InputForm: React.FC<InputFormProps> = ({
  input,
  setInput,
  run,
  clearMessages,
  textareaRef,
}) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        run(event);
      }
    },
    [run]
  );

  return (
    <form
      onSubmit={run}
      className="mt-auto absolute bottom-0 w-full md:py-5 flex items-center"
    >
      <textarea
        ref={textareaRef}
        rows={1}
        className="textarea py-4 rounded-xl w-full bg-slate-200 text-black overflow-y-auto resize-none"
        spellCheck="false"
        placeholder="Let's brainstorm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ height: "auto", maxHeight: "150px" }}
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
  );
};

export default InputForm;
