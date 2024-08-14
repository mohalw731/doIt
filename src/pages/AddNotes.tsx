import { MagicWandIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

export default function AddNotes() {
  const [value, setValue] = useState("");
  const [highlightedText, setHighlightedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString()) {
        const selectedText = selection.toString();
        setHighlightedText(selectedText);
      }
    };

    document.addEventListener("mouseup", handleSelectionChange);
    document.addEventListener("keyup", handleSelectionChange);
    return () => {
      document.removeEventListener("mouseup", handleSelectionChange);
      document.removeEventListener("keyup", handleSelectionChange);
    };
  }, []);

  const handleAigen = async () => {
    setLoading(true);

    if (highlightedText) {
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo", 
            messages: [{ role: "user", content: highlightedText }],
            max_tokens: 100, 
          },
          {
            headers: {
              Authorization: `Bearer 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`,
              "Content-Type": "application/json",
            },
          }
        );

        const generatedText = response.data.choices[0].message.content;
        setValue(() => `${generatedText}`);
        setLoading(false);
      } catch (error) {
        setError("Error generating text:" + error);
        setLoading(false);
        setTimeout(() => setError(""), 3000);
      }
    } else {
      setError("No text selected");
      setLoading(false);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <>
      <div className="blue-shadow " />
      <main className="max-w-[1200px] mx-auto h-[calc(100vh-64px)] md:h-screen md:p-5 flex flex-col">
        <div className="py-6 flex items-center justify-between">
          <input
            type="text"
            className="font-bold bg-transparent md:text-3xl text-xl outline-none"
            placeholder="Untitled Document"
          />
          {loading ? (
            <button className="btn btn-circle btn-ghost">
              <span className="loading loading-spinner"></span>
            </button>
          ) : (
            <button className="btn btn-circle btn-ghost" onClick={handleAigen}>
              <MagicWandIcon className="size-6" />
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-center mb-5">{error}</p>}
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="flex-1 custom-quill rounded-xl mb-10"
        />
      </main>
    </>
  );
}
