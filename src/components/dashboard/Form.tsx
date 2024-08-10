import TodoList from "./TodoList";
import Welcome from "../layout/Welcome";
import { useTodoContext } from "../../context/TodoContext";
import Quote from "./Quote";
import { Input } from "./Input";
import CategoryList from "./CategoryList";
import { useState } from "react";

function Form() {
  const { addTodo } = useTodoContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <main className="py-5  max-w-[700px] mx-auto z-50 pb-14">
      <Quote />
      <Welcome />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(selectedCategory);
        }}
        className="max-w-[700px]"
      >
        <Input selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
        <CategoryList />
        <TodoList />
      </form>
    </main>
  );
}

export default Form;
