import {  EyeClosedIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function Quote() {
  const [quote, setQuote] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  async function fetchQuotes() {
    const response = await fetch("https://type.fit/api/quotes");
    const quotes = await response.json();
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)].text;
    setQuote(randomQuote);
  }

  function getStoredDate() {
    return localStorage.getItem('lastQuoteDate');
  }

  function setStoredDate(date: string) {
    localStorage.setItem('lastQuoteDate', date);
  }

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const storedDate = getStoredDate();

    if (storedDate !== today) {
      // If the stored date is not today, fetch a new quote and update the date
      fetchQuotes();
      setStoredDate(today);
    } else {
      // Otherwise, just fetch the quote from localStorage if necessary
      const savedQuote = localStorage.getItem('currentQuote');
      if (savedQuote) {
        setQuote(savedQuote);
      } else {
        fetchQuotes();
      }
    }
  }, []);

  useEffect(() => {
    if (quote) {
      // Save the current quote in localStorage
      localStorage.setItem('currentQuote', quote);
    }
  }, [quote]);

  return (
    <div className={`flex flex-col items-center  ${!isOpen ? 'mb-5' : 'mb-5 md:mb-10'}`}>
    <div className={`md:text-2xl flex flex-col text-center items-center justify-start text-lg z-50 mb-1 ${!isOpen ? 'hidden' : 'visible'}`}>
      <h2 className="md:text-lg text-base text-slate-500">Quote of the day :</h2>
      <span className="text-slate-400">“{quote}”</span>
    </div>
    
    <span className="text-slate-600 btn btn-sm btn-ghost btn-circle flex items-center justify-center	" onClick={() => setIsOpen(!isOpen)}> {
        isOpen ? <EyeClosedIcon className="size-6" /> : <LightningBoltIcon className=" size-6" />
        }</span>
    </div>
  );
}
