import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../configs/Firebase";

export default function useAddMailToWaitingList() {
    const [email, setEmail] = useState<string>("");

    const handleAddMailToWaitlist = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes("@") || !email || !email.includes(".")) {
            toast.error("Please enter a valid email");
            return;
        }
        try {
            await addDoc(collection(db, "emails"), { email });
            toast.success("Email added to waitlist");
            setEmail("");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return {
        email,
        setEmail,
        handleAddMailToWaitlist,
    };
}
