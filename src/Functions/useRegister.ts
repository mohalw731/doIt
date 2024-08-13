import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../configs/Firebase";


interface RegisterState {
  name: string;
  email: string;
  password: string;
  error: string | null;
}

const initialState: RegisterState = {
  name: "",
  email: "",
  password: "",
  error: null,
};

export default function useRegister() {
  const [state, setState] = useState<RegisterState>(initialState);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const validateForm = (): string | null => {
    const { name, email, password } = state;
    if (!name.trim()) return "Name is required.";
    if (!email.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters long.";
    return null;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setState(prevState => ({ ...prevState, error: validationError }));
      setTimeout(() => setState(prevState => ({ ...prevState, error: null })), 3000);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "User", user.uid), {
        email: user.email,
        name: state.name,
        uid: user.uid,
        password: state.password,
      });

      navigate("/");
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error);
      setState(prevState => ({ ...prevState, error: errorMessage }));
      setTimeout(() => setState(prevState => ({ ...prevState, error: null })), 3000);
    }
  };

  return {
    state,
    handleInputChange,
    handleRegister,

  };
}

const getFirebaseErrorMessage = (error: any): string => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "The email address is already in use by another account.";
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled.";
    case "auth/weak-password":
      return "The password is too weak.";
    default:
      return "Registration failed. Please try again.";
  }
};
