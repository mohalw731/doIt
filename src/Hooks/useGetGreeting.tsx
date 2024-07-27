import { useEffect, useState } from "react";
import { useTodoContext } from "../context/TodoContext";

export default function useGetGreeting() {
  const { todos } = useTodoContext();
  const [currentTodos, setCurrentTodos] = useState(0);

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  const formatDate = () => {
    const date = new Date();
    const options = { weekday: "long", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options as any);
  };

  useEffect(() => {
    if (todos) {
      const completedTasks = todos.filter((todo) => !todo.completed).length;
      setCurrentTodos(completedTasks);
    }
  }, [todos]);

  return { getGreeting, formatDate, currentTodos };
}
