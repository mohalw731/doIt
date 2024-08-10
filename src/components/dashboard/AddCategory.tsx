import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useCategory } from "../../context/CategoryContext";

const AddCategory: React.FC = () => {
  const {
    category,
    setCategory,
    error,
    handleAddCategory,
    setIsOpen,
    isOpen,
    setEmoji,
    emoji,
  } = useCategory();
  const [isOpenEmoji, setIsOpenEmoji] = useState<boolean>(false);

  const handleEmojiSelect = (emoji: any) => {
    setEmoji(emoji.native);
    setIsOpenEmoji(false);
  };

  return (
    <main className={`${isOpen ? "overlay px-2" : ""} flex flex-col relative`}>
      <section className="bg-slate-200 text-slate-600 p-5 rounded-xl max-w-lg w-full flex flex-col">
        <header className="flex items-center justify-between pb-7">
          <h2 className="text-xl font-bold">Add Category</h2>
          <Cross2Icon
            className="size-7 bg-transparent text-slate-400 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </header>
        
        <div className={`relative flex flex-col ${!error.error && "gap-5"}`}>


          {/* Input */}
          <div className="relative">
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

            <span
              className={`text-2xl absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ${error.error && "top-6 duration-0"}`}
              onClick={() => setIsOpenEmoji(!isOpenEmoji)}
            >
              {emoji}
            </span>

          </div>

          {/* Button */}
          <div className="mb-5">
            <a
              className="py-3 px-4 font-normal rounded-xl text-white hover:opacity-80 bg-slate-800 text-sm cursor-pointer hover:scale-105"
              onClick={handleAddCategory}
            >
              Add Category
            </a>
          </div>
        </div>

        {isOpenEmoji && (
          <Picker
            className="absolute"
            data={data}
            onEmojiSelect={handleEmojiSelect}
          />
        )}
      </section>
    </main>
  );
};

export default AddCategory;
