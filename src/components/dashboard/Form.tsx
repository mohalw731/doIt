import { PlusIcon } from "@radix-ui/react-icons";
import TodoList from "./TodoList";
import Welcome from "../layout/Welcome";
import { useTodoContext } from "../../context/TodoContext";
import Quote from "./Quote";

function Form() {
  const { addTodo } = useTodoContext();

  return (
    <main className=" py-5 md:pt-7 max-w-[600px] mx-auto z-50 pb-14">
      <Quote />
      <Welcome />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
        className="max-w-[600px]">
        <Input />
        <TodoList />
      </form>
    </main>
  );
}

const Input = () => {
  const { todoText, setTodoText, addTodo } = useTodoContext();
  // const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <>
      <div className="relative ">
        <input
          type="text"
          value={todoText}
          className="input py-7 rounded-xl  w-full bg-slate-200 text-slate-600"
          placeholder="Write a new task"
          onChange={(e) => setTodoText(e.target.value)}
          required
          spellCheck={false}
        />
        <PlusIcon
          className="absolute right-3 top-1/2 -translate-y-1/2 size-7 text-slate-400 cursor-pointer"
          onClick={() => addTodo()}
        />
      </div>
      {/* <h2 className="text-slate-400 mt-1 text-sm">{`${completedCount}/${todos.length}`}</h2> */}
    </>
  );
};

export default Form;
