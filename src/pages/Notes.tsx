import { useUser } from '@clerk/clerk-react';
import Navbar from '../components/layout/Navbar'
import { PlusIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

export default function Notes() {
    const {user} = useUser();
    const navigate = useNavigate();
  return (
    <main className='z-50 bg-slate-100'>
      <Navbar/>
    
      <section className='mb-10'>
      <div className=" w-full flex justify-between items-center">
      <h1 className='text-3xl font-bold text-slate-800 my-10'>{user?.firstName}'s notes</h1>
      <button className='btn btn-sm btn-ghost btn-circle' onClick={() => navigate('/notes/add')}><PlusIcon className='size-7 text-slate-400 hover:text-slate-600'/> </button>
      </div>
        <ul  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center'>
            <li className='w-full max-w-md p-7 rounded-xl border flex flex-col gap-3 cursor-pointer hover:bg-slate-200 '>
                <h2 className='text-xl font-semibold text-slate-800 '>Note test</h2>
                <p className='text-slate-400'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia rerum velit dolores quo quaerat necessitatibus!</p>
            </li>
        </ul>
      </section>
    </main>
  )
}
