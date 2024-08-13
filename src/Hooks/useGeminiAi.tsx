import { useState } from "react";
import { useChat } from "../context/ChatContext";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function useGeminiAi() {
  const { messages, addMessage } = useChat();
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [context, setContext] = useState<string>("");

  const genAI = new GoogleGenerativeAI(
    "AIzaSyB4ZIRSbcNg-k6ceYV2-3seW2rtEy7_BAQ"
  );

  const run = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;
    setInput("");
    const userMessage = { text: input, isUser: true };
    addMessage(userMessage);

    setLoading(true);

    try {
      // Combine the history of messages into a single input string
      const messageHistory = messages
        .map((msg) => `${msg.isUser ? "User" : "AI"}: ${msg.text}`)
        .join("\n");
      const fullInput = `${context}\n${messageHistory}\nUser: ${input}`;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent(fullInput);
      const text = await result.response.text();
      const aiMessage = { text, isUser: false };
      addMessage(aiMessage);
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const autoMessage = (message: string) => {
    const aiMessage = { text: message, isUser: false };
    addMessage(aiMessage);
  };

  return {
    input,
    setInput,
    loading,
    run,
    error,
    setContext,
    autoMessage,
  };
}
