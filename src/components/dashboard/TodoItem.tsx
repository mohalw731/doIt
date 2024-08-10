import { Todo } from "../../types/todo";
import { useTodoContext } from "../../context/TodoContext";

function TodoItem({ todo }: { todo: Todo }) {
  const { toggleCompleted, handleDeleteTodos } = useTodoContext();

  return (
    <li
      className={`${
        todo.completed ? "bg-slate-200" : "bg-white"
      } border-slate-200 border-[1px] text-slate-600 py-4 text-lg rounded-xl px-4 flex items-center justify-between hover:scale-105 duration-300 cursor-pointer`}
      onClick={() => toggleCompleted(todo.id)}
      onDoubleClick={() => handleDeleteTodos(todo.id)}
    >
      <div className=" flex items-center gap-2">
        <span>{todo.emoji}</span>
        <span>{todo.text}</span>
      </div>
      <input
        type="checkbox"
        className="checkbox checkbox-sm"
        onChange={() => toggleCompleted(todo.id)}
        checked={todo.completed}
      />
    </li>
  );
}

export default TodoItem;
