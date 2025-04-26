import { useEffect, useRef } from "react";

export default function useAdjustHeight() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);


  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  return { textareaRef, adjustTextareaHeight };
}
