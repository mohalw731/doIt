import { useEffect, useState } from 'react';
import useUserDetails from '../auth-functions/useUserDeatils';
// OR for Firestore:
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

export default function useGetDailyQuotes() {
    const [quote, setQuote] = useState("");
    const { userDetails } = useUserDetails();
    const userId = userDetails?.uid;
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    async function fetchQuotes() {
        const response = await fetch("https://type.fit/api/quotes");
        const quotes = await response.json();
        return quotes[Math.floor(Math.random() * quotes.length)].text;
    }

    async function getUserQuoteData() {
        if (!userId) return null;
        

        const db = getFirestore();
        const userQuoteRef = doc(db, 'userQuotes', userId);
        const snapshot = await getDoc(userQuoteRef);
        return snapshot.data();
    }

    async function saveUserQuoteData(data: any) {
        if (!userId) return;
        

        const db = getFirestore();
        await setDoc(doc(db, 'userQuotes', userId), data);
    }

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];

        async function initializeQuote() {
            if (!userId) {
                setLoading(false);
                return;
            }

            const userData = await getUserQuoteData();
            const storedDate = userData?.lastQuoteDate;
            const storedQuote = userData?.currentQuote;
            const storedIsOpen = userData?.isOpen;

            // Set isOpen state from DB or default to false
            setIsOpen(storedIsOpen !== undefined ? storedIsOpen : false);

            if (storedDate !== today) {
                // If the stored date is not today, fetch a new quote
                const newQuote = await fetchQuotes();
                setQuote(newQuote);
                await saveUserQuoteData({
                    lastQuoteDate: today,
                    currentQuote: newQuote,
                    isOpen: isOpen // current state
                });
            } else if (storedQuote) {
                // Otherwise, use the stored quote
                setQuote(storedQuote);
            } else {
                // If no quote exists, fetch one
                const newQuote = await fetchQuotes();
                setQuote(newQuote);
                await saveUserQuoteData({
                    lastQuoteDate: today,
                    currentQuote: newQuote,
                    isOpen: isOpen // current state
                });
            }
            setLoading(false);
        }

        initializeQuote();
    }, [userId]);

    useEffect(() => {
        if (!userId || !quote) return;

        // Save the current quote in DB whenever it changes
        saveUserQuoteData({
            currentQuote: quote,
            isOpen: isOpen,
            lastQuoteDate: new Date().toISOString().split('T')[0]
        });
    }, [quote, userId]);

    useEffect(() => {
        if (!userId) return;

        // Save isOpen state in DB whenever it changes
        saveUserQuoteData({
            currentQuote: quote,
            isOpen: isOpen,
            lastQuoteDate: new Date().toISOString().split('T')[0]
        });
    }, [isOpen, userId]);

    return { quote, isOpen, setIsOpen, loading };
}