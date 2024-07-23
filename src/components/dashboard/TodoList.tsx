
import { useTodoContext } from '../../context/TodoContext'
import TodoItem from './TodoItem'

export default function TodoList() {
  const {todos} = useTodoContext()
  return (
    <ul className="space-y-1 mt-4">
      {
        todos.map((todo: any) => (
          <TodoItem key={todo.id} todo={todo}  />
        ))
      }

      {
        todos.length === 0 && (
          <span className='text-center text-slate-400 text-2xl w-full flex items-center justify-center mt-20'> No tasks</span>
        )
      }
    </ul>
  )
}
