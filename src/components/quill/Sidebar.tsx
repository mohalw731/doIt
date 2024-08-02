import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";

export default function Sidebar() {
  return (
    <nav className="bg-slate-300 h-[calc(100dvh-120px)] w-2xl rounded-xl p-7 absolute left-0  mx-auto z-[999] max-w-2xl">
      <div className="flex flex-col gap-3 items-start">
        <Cross2Icon className="size-6 text-slate-800" />
        <PlusIcon className="size-6 " />
      </div>
      <ul>
        <li></li>
      </ul>
    </nav>
  );
}
