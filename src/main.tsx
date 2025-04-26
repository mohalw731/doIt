import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Container from "./components/layout/Container.tsx";
import { TodoProvider } from "./context/TodoContext.tsx";

import { CategoryProvider } from "./context/CategoryContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <CategoryProvider>
            <TodoProvider>
              <Container>
                <App />
              </Container>
            </TodoProvider>
      </CategoryProvider>
  </React.StrictMode>
);
