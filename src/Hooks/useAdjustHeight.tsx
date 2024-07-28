import React, { useEffect, useRef } from "react";
import useGeminiAi from "./useGeminiAi";

export default function useAdjustHeight() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { input } = useGeminiAi();


  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  return { textareaRef, adjustTextareaHeight };
}
