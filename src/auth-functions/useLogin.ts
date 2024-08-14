import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {  useNavigate,  } from "react-router-dom";
import { auth } from "../configs/Firebase";

interface LoginState {
  email: string;
  password: string;
  error: string | null;
}

const initialState: LoginState = {
  email: "",
  password: "",
  error: null,
};

export default function useLogin() {
  const [state, setState] = useState<LoginState>(initialState);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const validateForm = (): string | null => {
    const { email, password } = state;
    if (!email.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters long.";
    return null;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setState(prevState => ({ ...prevState, error: validationError }));
      setTimeout(() => setState(prevState => ({ ...prevState, error: null })), 3000);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, state.email, state.password);
      navigate("/");
      console.log("isSignedin");
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error);
      setState(prevState => ({ ...prevState, error: errorMessage }));
      setTimeout(() => setState(prevState => ({ ...prevState, error: null })), 3000);
    }
  };

  return {
    state,
    handleInputChange,
    handleLogin,
  };
}

const getFirebaseErrorMessage = (error: any): string => {
  switch (error.code) {
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/user-disabled":
      return "The user account has been disabled.";
    case "auth/user-not-found":
      return "There is no user corresponding to the email address.";
    case "auth/wrong-password":
      return "The password is invalid.";
    default:
      return "Login failed. Please check your credentials and try again.";
  }
};
