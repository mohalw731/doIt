import React, { createContext, useContext, useState } from "react";
import { Todo } from "../types/todo";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

interface TodoContextType {
  todos: any[];
  addTodo: () => void;
  setTodoText: React.Dispatch<React.SetStateAction<string>>;
  todoText: string;
  setTodos: React.Dispatch<React.SetStateAction<any[]>>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);
export function useTodoContext() {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
}

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const { userId } = useAuth();

  const newTodo = {
    id: Date.now(),
    text: todoText,
    completed: false,
    userId: userId || "",
  };

  const addTodo = () => {
    if (!todoText) {
      toast.error("Please enter a task");
      return;
    }
    setTodos([...todos, newTodo]);
    setTodoText("");
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, setTodoText, todoText, setTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
};
