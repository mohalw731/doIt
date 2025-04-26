import TodoList from "./TodoList";
import Welcome from "../layout/Welcome";
import { useTodoContext } from "../../context/TodoContext";
import { Input } from "./Input";
import CategoryList from "./CategoryList";
import { useState } from "react";

function Form() {
  const { addTodo } = useTodoContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <main className="md:py-14 py-10  max-w-[700px] mx-auto z-50 pb-14">
      <Welcome />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(selectedCategory);
        }}
        className="max-w-[700px]"
      >
        <Input selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
        <CategoryList setSelectedCategory={setSelectedCategory} />
        <TodoList selectedCategory={selectedCategory}/>
      </form>
    </main>
  );
}

export default Form;
