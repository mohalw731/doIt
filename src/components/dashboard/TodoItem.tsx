import { useTodoContext } from "../../context/TodoContext";
import { Todo } from "../../types/todo";

function TodoItem({ todo }: { todo: Todo }) {
  const { toggleCompleted, handleDeleteTodos } = useTodoContext();
  return (
    <li
      className="bg-white border-slate-200 border-[1px] text-slate-600  py-4 text-lg rounded-xl px-4 flex items-center justify-between"
      onClick={() => toggleCompleted(todo.id)}
      onDoubleClick={() => handleDeleteTodos(todo.id)}
    >
      <span className={todo.completed ? "line-through" : ""}>{todo.text}</span>
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
