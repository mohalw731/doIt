import { PlusIcon } from "@radix-ui/react-icons";
import AddCategory from "./AddCategory";
import { useCategory } from "../../context/CategoryContext";

export default function CategoryList({
  setSelectedCategory,
}: {
  setSelectedCategory: (category: string) => void;
}) {
  const { categories, handleDeleteCategory, isOpen, setIsOpen } = useCategory();

  return (
    <main className="pt-5 flex flex-wrap items-start gap-3">
      <ul className="flex flex-wrap gap-5 flex-grow items-center">
        <li
          className="bg-slate-200 text-slate-600 py-3 px-4 rounded-xl hover:bg-slate-300 cursor-pointer hover:scale-105"
          onClick={() => {
            setSelectedCategory("");
          }}
        >
          All Tasks
        </li>
        {categories.map((category) => (
          <li
            className="bg-slate-200 text-slate-600 py-3 px-4 rounded-xl hover:bg-slate-300 cursor-pointer hover:scale-105"
            key={category.id}
            onDoubleClick={() => handleDeleteCategory(category.id)}
            onClick={() => {
              setSelectedCategory(category.id);
            }}
          >
            {category.name}
          </li>
        ))}

        <PlusIcon
          className="size-7 text-slate-400 cursor-pointer hover:text-slate-600  btn btn-sm btn-ghost btn-circle"
          onClick={() => setIsOpen(true)}
        />
      </ul>

      {isOpen && <AddCategory />}
    </main>
  );
}
