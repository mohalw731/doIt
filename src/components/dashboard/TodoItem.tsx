
function TodoItem() {
  return (
    <li className="bg-white border-slate-200 border-[1px] text-slate-600  py-4 text-lg rounded-xl px-4 flex items-center justify-between">
      task
      <input type="checkbox" className="checkbox checkbox-sm" />
    </li>
  );
}

export default TodoItem;
