import { PlusIcon } from "@radix-ui/react-icons";
import TodoList from "./TodoList";
import Welcome from "./Welcome";
import { useTodoContext } from "../../context/TodoContext";

function Form() {
  const { addTodo, setTodoText, todoText } = useTodoContext();

  return (
    <main className=" py-10 max-w-[600px] mx-auto z-50">
      <Welcome />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
        className="max-w-[600px]"
      >
        <div className="relative">
          <input
            type="text"
            value={todoText}
            className="input py-7 rounded-xl  w-full bg-slate-200 text-black"
            placeholder="Write a new task"
            onChange={(e) => setTodoText(e.target.value)}
          />
          <PlusIcon
            className="absolute right-3 top-1/2 -translate-y-1/2 size-7 text-slate-400 cursor-pointer"
            onClick={() => addTodo()}
          />
        </div>
          <TodoList />
      </form>
    </main>
  );
}

export default Form;
