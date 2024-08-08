// src/context/TodoContext.tsx
import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Todo } from "../types/todo";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../configs/Firebase";

interface TodoContextType {
  todos: Todo[];
  addTodo: (categoryId: string) => void; // Updated to accept categoryId
  setTodoText: React.Dispatch<React.SetStateAction<string>>;
  todoText: string;
  toggleCompleted: (id: string) => void;
  handleDeleteTodos: (id: string) => void;
  loading: boolean;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
}

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;

    const todosQuery = query(collection(db, "todos"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(todosQuery, (snapshot) => {
      const fetchedTodos: Todo[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
        completed: doc.data().completed,
        userId: doc.data().userId,
        categoryId: doc.data().categoryId // Assuming your Todo type has categoryId
      }));
      setTodos(fetchedTodos);
      setLoading(false);
      console.log(fetchedTodos);
    }, (error) => {
      console.error("Error fetching todos: ", error);
    });

    return () => unsubscribe();
  }, [userId]);

  const addTodo = async (categoryId: string) => { // Accept categoryId
    if (!todoText) {
      toast.error("Please enter a task");
      return;
    }

    try {
      const newTodo = {
        text: todoText,
        completed: false,
        userId: userId || "",
        categoryId // Include categoryId
      };

      await addDoc(collection(db, "todos"), newTodo);
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
    } catch (error) {
      console.error("Error toggling completed: ", error);
    }
  };

  const handleDeleteTodos = async (id: string) => {
    try {
      const todoRef = doc(db, "todos", id);
      await deleteDoc(todoRef);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const contextValue = useMemo(() => ({
    todos,
    addTodo,
    setTodoText,
    todoText,
    toggleCompleted,
    handleDeleteTodos,
    loading
  }), [todos, todoText]);

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};
