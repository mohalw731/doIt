import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Container from "./components/layout/Container.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { TodoProvider } from "./context/TodoContext.tsx";
import { ChatProvider } from "./context/ChatContext.tsx";
import { NotesProvider } from "./context/NotesContext.tsx";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <NotesProvider>
        <ChatProvider>
          <TodoProvider>
            <Container>
              <App />
            </Container>
          </TodoProvider>
        </ChatProvider>
      </NotesProvider>
    </ClerkProvider>
  </React.StrictMode>
);
