import { useTodoContext } from '../../context/TodoContext';
import TodoItem from './TodoItem';

export default function TodoList() {
  const { todos, loading } = useTodoContext();

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'morning  🥱';
    if (hours < 18) return 'afternoon 😊';
    return 'evening 😴';
  };

  if (loading) {
    return (
      <span className='text-center text-slate-400 md:text-2xl w-full flex items-center justify-center mt-20 text-xl'>
        Loading...
      </span>
    );
  }

  return (
    <ul className="space-y-2 mt-5">
      {todos.length > 0 ? (
        todos.map((todo: any) => (
          <TodoItem key={todo.id} todo={todo} />
        ))
      ) : (
        <span className='text-center text-slate-400 md:text-2xl w-full flex items-center justify-center mt-20 text-xl'>
          Let's start your {getGreeting()}
        </span>
      )}
    </ul>
  );
}
