import { PlusIcon } from "@radix-ui/react-icons";
import { useTodoContext } from "../../context/TodoContext";

export const Input = () => {
    const { todoText, setTodoText, addTodo } = useTodoContext();
    return (
      <>
        <div className="relative ">
          <input
            type="text"
            value={todoText}
            className="input py-7 rounded-xl  w-full bg-slate-200 text-slate-600"
            placeholder="Write a new task"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTodoText(e.target.value)
            }
            required
            spellCheck={false}
          />
          {todoText.length > 0 && (
            <PlusIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 size-7 bg-slate-200 text-slate-400 cursor-pointer"
              onClick={addTodo}
            />
          )}
        </div>
      </>
    );
  };