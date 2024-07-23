import { PlusIcon } from "@radix-ui/react-icons";
import TodoList from "./TodoList";
import Welcome from "./Welcome";

function Form() {
  return (
    <main className=" py-10 max-w-[600px] mx-auto">
     <Welcome/>
      <form action="" className="max-w-[600px]">
        <div className="relative">
          <input
            type="text"
            className="input py-7 rounded-xl  w-full bg-slate-200 text-black"
            placeholder="Write a new task"
          />
          <PlusIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-7 text-slate-400 cursor-pointer" />
        </div>

      <TodoList/>
      </form>
    </main>
  );
}

export default Form;
