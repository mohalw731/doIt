
import { useTodoContext } from '../../context/TodoContext'
import TodoItem from './TodoItem'

export default function TodoList() {

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'morning  🥱';
    if (hours < 18) return  'afternoon 😊';
    return 'evening 😴';
  };

  const {loading} = useTodoContext()

  if(loading) {
    return <span className='text-center text-slate-400 md:text-2xl w-full flex items-center justify-center mt-20 text-xl '> Loading...</span>
  }

  const {todos} = useTodoContext()
  return (
    <ul className="space-y-2 mt-4">
      {
        todos.map((todo: any) => (
          <TodoItem key={todo.id} todo={todo}  />
        ))
      }

      {
        todos.length === 0 && (
          <span className='text-center text-slate-400 md:text-2xl w-full flex items-center justify-center mt-20 text-xl '> Let's start your  {getGreeting()}</span>
        )
      }
    </ul>
  )
}
