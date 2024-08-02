import { useEffect, useState } from 'react';

export default function useGetDailyQuotes() {
    const [quote, setQuote] = useState("");
    const [isOpen, setIsOpen] = useState(() => {
        // Initialize isOpen state from localStorage
        const storedIsOpen = localStorage.getItem('isOpen');
        return storedIsOpen === null ? false : storedIsOpen === 'true';
    });

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
        const today = new Date().toISOString().split('T')[0];
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

    useEffect(() => {
        // Save isOpen state in localStorage whenever it changes
        localStorage.setItem('isOpen', isOpen.toString());
    }, [isOpen]);

    return { quote, isOpen, setIsOpen };
}
