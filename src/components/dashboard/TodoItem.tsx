import { useTodoContext } from "../../context/TodoContext";
import { Todo } from "../../types/todo";

function TodoItem({ todo }: { todo: Todo }) {

  const {toggleCompleted} = useTodoContext()
  return (
    <li className="bg-white border-slate-200 border-[1px] text-slate-600  py-4 text-lg rounded-xl px-4 flex items-center justify-between">
      <span className={todo.completed ? "line-through": '' }>{todo.text}</span>
      <input type="checkbox" className="checkbox checkbox-sm" onChange={() => toggleCompleted(todo.id)} checked={todo.completed}/>
    </li>
  );
}

export default TodoItem;
