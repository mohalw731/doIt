import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Container from "./components/layout/Container.tsx";
import { TodoProvider } from "./context/TodoContext.tsx";
import { ChatProvider } from "./context/ChatContext.tsx";
import { NotesProvider } from "./context/NotesContext.tsx";
import { CategoryProvider } from "./context/CategoryContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <CategoryProvider>
        <NotesProvider>
          <ChatProvider>
            <TodoProvider>
              <Container>
                <App />
              </Container>
            </TodoProvider>
          </ChatProvider>
        </NotesProvider>
      </CategoryProvider>
  </React.StrictMode>
);
