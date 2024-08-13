import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Todo } from "../types/todo";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../configs/Firebase";
import { useCategory } from "./CategoryContext";
import useUserDetails from "../Functions/useUserDeatils";

interface TodoContextType {
  todos: Todo[];
  addTodo: (categoryId: string) => void;
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

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { selectedCategoryEmoji, categories } = useCategory();
  const { userDetails } = useUserDetails();
  const userId = userDetails?.uid;

  useEffect(() => {
    if (!userId) return;
    setLoading(true); // Ensure loading state is set to true before fetching starts.
    const todosQuery = query(
      collection(db, "todos"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
  
    const unsubscribe = onSnapshot(todosQuery, (snapshot) => {
      const fetchedTodos: Todo[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
        completed: doc.data().completed,
        userId: doc.data().userId,
        categoryId: doc.data().categoryId,
        emoji: doc.data().emoji,
        createdAt: doc.data().createdAt.toDate(),
      }));
      setTodos(fetchedTodos);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching todos: ", error);
    });
    
    return () => unsubscribe();
  }, [userId]);
  
  

  const addTodo = async (categoryId: string) => {
    if (!todoText) {
      toast.error("Please enter a task");
      return;
    }

    try {
      const category = categories.find((cat) => cat.id === categoryId);
      const categoryEmoji = category ? category.emoji : selectedCategoryEmoji || "🔥";

      const newTodo = {
        text: todoText,
        completed: false,
        userId: userId || "",
        categoryId: categoryId || "",
        emoji: categoryEmoji, // Use the category emoji
        createdAt: new Date(), // Add a creation timestamp

      };

      await addDoc(collection(db, "todos"), newTodo);
      setTodoText("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toggleCompleted = async (id: string) => {
    const todoRef = doc(db, "todos", id);
    const todoDoc = await getDoc(todoRef);
    const updatedTodo = { ...todoDoc.data(), completed: !todoDoc?.data()?.completed };

    try {
      await updateDoc(todoRef, updatedTodo);
    } catch (error: any) {
      // toast.error(error.message);
    }
  };

  const handleDeleteTodos = async (id: string) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      // Update local state after deletion
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  

  const value = useMemo(() => ({
    todos,
    addTodo,
    setTodoText,
    todoText,
    toggleCompleted,
    handleDeleteTodos,
    loading,
  }), [todos, todoText, loading]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
