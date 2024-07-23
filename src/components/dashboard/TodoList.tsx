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
    </ul>
  )
}
