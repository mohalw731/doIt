import { useUser } from "@clerk/clerk-react"

export default function Welcome() {
  const {user} = useUser()

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = () => {
    const date = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options as any);
  };

  return (
    <div className="flex flex-col md:gap-2 md:mb-10 mb-5">
       <h1   className="text-slate-800 md:text-5xl text-2xl font-semibold">{getGreeting()}, {user?.firstName}</h1>
       <span className="text-slate-400 md:text-3xl text-lg">It's {formatDate()}</span>
    </div>
  )
}
