import React, { createContext, useContext, useState } from "react";
import { Todo } from "../types/todo";

interface TodoContextType {
  todos: any[];
  addTodo: () => void;
  setTodoText: React.Dispatch<React.SetStateAction<string>>;
  todoText: string;
  setTodos: React.Dispatch<React.SetStateAction<any[]>>
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
    const [todos, setTodos] = useState<Todo[]>([])
    const [todoText, setTodoText] = useState<string>("")
  
    const addTodo = () => {
      const newTodo = {
        id: Date.now(),
        text: todoText,
        completed: false,
      };
      setTodos([...todos, newTodo])
      setTodoText("")
    }

  return (
    <TodoContext.Provider value={{ todos, addTodo, setTodoText, todoText, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
