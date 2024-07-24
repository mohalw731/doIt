import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Todo } from "../types/todo";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../configs/Firebase";

interface TodoContextType {
  todos: Todo[];
  addTodo: () => void;
  setTodoText: React.Dispatch<React.SetStateAction<string>>;
  todoText: string;
  setTodos: React.Dispatch<React.SetStateAction<any[]>>;
  toggleCompleted: (id: string) => void;
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

  // Fetch todos only when userId changes
  useEffect(() => {
    if (userId) {
      handleGetTodos();
    }
  }, [userId,todos]);

  const handleGetTodos = async () => {
    if (!userId) return;

    try {
      const todosQuery = query(collection(db, "todos"), where("userId", "==", userId));
      const querySnapshot = await getDocs(todosQuery);
      const fetchedTodos: Todo[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
        completed: doc.data().completed,
        userId: doc.data().userId,
      }));
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };

  const addTodo = async () => {
    if (!todoText) {
      toast.error("Please enter a task");
      return;
    }

    try {
      const newTodo = {
        id: Date.now().toString(),
        text: todoText,
        completed: false,
        userId: userId || "",
      };

      const docRef = await addDoc(collection(db, "todos"), {
        ...newTodo,
        userId: userId || "",
        id: Date.now(),
      });
      setTodos((prevTodos) => [...prevTodos, { ...newTodo, id: docRef.id }]);
      setTodoText("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toggleCompleted = async (id: string) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (!todoToUpdate) return;

      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, {
        completed: !todoToUpdate.completed,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling completed: ", error);
    }
  };

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    todos,
    addTodo,
    setTodoText,
    todoText,
    setTodos,
    toggleCompleted,
  }), [todos, todoText]);

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};
