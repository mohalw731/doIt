import { Cross2Icon } from "@radix-ui/react-icons";
import { useCategory } from "../../context/CategoryContext";

export default function AddCategory() {
  const { category, setCategory, error, handleAddCategory, setIsOpen, isOpen } = useCategory();
  return (
    <main className={`${isOpen ? "overlay" : ""}`}>
      <section className="bg-slate-200 text-slate-600 p-5 rounded-xl max-w-lg w-full flex flex-col mx-5">
        <div className="flex items-center justify-between pb-10">
          <h2 className="text-xl font-bold">Add Category</h2>
          <Cross2Icon
            className="size-7 bg-transparent text-slate-400 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className={`relative flex flex-col ${!error.error && "gap-5"}`}>
          <input
            type="text"
            className="input bg-slate-100 text-slate-600 w-full"
            placeholder="Enter category name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {error.error && (
            <p className="text-red-500 text-sm mb-5 mt-1">{error.message}</p>
          )}
          <div className="pb-5">
            <a
              className="py-3 px-4 font-normal rounded-xl text-white hover:opacity-80 bg-slate-800 text-sm cursor-pointer hover:scale-105"
              onClick={handleAddCategory}
            >
              Add Category
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
