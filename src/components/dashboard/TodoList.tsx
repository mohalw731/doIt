import { useTodoContext } from "../../context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList({ selectedCategory }: { selectedCategory: string }) {
  const { todos, loading } = useTodoContext();

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "morning 🥱";
    if (hours < 18) return "afternoon 😊";
    return "evening 😴";
  };

  if (loading) {
    return (
      <span className="text-center text-slate-400 md:text-2xl w-full flex items-center justify-center mt-20 text-xl">
        Loading...
      </span>
    );
  }

  // Filter todos based on the selected category
  const filteredTodos = selectedCategory
    ? todos.filter((todo) => todo.categoryId === selectedCategory)
    : todos;

    const sortedTodos = filteredTodos.sort((a, b) => {
      // @ts-ignore: We are handling the type of createdAt manually
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt.seconds * 1000);
      // @ts-ignore: We are handling the type of createdAt manually
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt.seconds * 1000);
      return dateB.getTime() - dateA.getTime();
    });

  return (
    <ul className="space-y-2 mt-5">
      {sortedTodos.length > 0 ? (
        sortedTodos.map((todo: any) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <span className="text-center text-slate-400 md:text-2xl w-full flex items-center justify-center mt-20 text-xl">
          Let's start your {getGreeting()}
        </span>
      )}
    </ul>
  );
}
