import { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function useGeminiAi() {
  const { messages, addMessage } = useChat();
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const genAI = new GoogleGenerativeAI("AIzaSyAxaPupjEmVFR3dRo68ujhtopHQpN7CZC4");

  const run = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    addMessage(userMessage);

    setLoading(true);

    try {
      // Combine the history of messages into a single input string
      const messageHistory = messages.map(msg => `${msg.isUser ? 'User' : 'AI'}: ${msg.text}`).join('\n');
      const fullInput = `${messageHistory}\nUser: ${input}`;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(fullInput);
      const text = await result.response.text();
      const aiMessage = { text, isUser: false };
      addMessage(aiMessage);
      setInput("");
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    input,
    setInput,
    loading,
    run
  };
}
