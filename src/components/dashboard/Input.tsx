import { PlusIcon } from "@radix-ui/react-icons";
import { useTodoContext } from "../../context/TodoContext";
import { useCategory } from "../../context/CategoryContext";

export const Input = () => {
  const { todoText, setTodoText, addTodo } = useTodoContext();
  const { categories } = useCategory();
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
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <select className="select  md:select-md select-md bg-slate-200  w-[115px] text-slate-600">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <PlusIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 size-7 bg-slate-200 text-slate-400 cursor-pointer"
              onClick={addTodo}
            />
          </div>
        )}
      </div>
    </>
  );
};
