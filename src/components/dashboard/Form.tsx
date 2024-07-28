import TodoList from "./TodoList";
import Welcome from "../layout/Welcome";
import { useTodoContext } from "../../context/TodoContext";
import Quote from "./Quote";
import { Input } from "./Input";

function Form() {
  const { addTodo } = useTodoContext();
  return (
    <main className="py-5  max-w-[600px] mx-auto z-50 pb-14">
      <Quote />
      <Welcome />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
        className="max-w-[600px]"
      >
        <Input />
        <TodoList />
      </form>
    </main>
  );
}

export default Form;
