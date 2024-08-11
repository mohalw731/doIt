import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <Link to='/' className="flex justify-center items-center h-screen">
      <h1 className='text-3xl font-black text-slate-400 hover:text-slate-700 cursor-pointer tracking-wide'>404 Page Not Found</h1>
    </Link>
  )
}
