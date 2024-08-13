import useUserDetails from "../../Functions/useUserDeatils";
import useGetGreeting from "../../Hooks/useGetGreeting"; // Ensure this path is correct

export default function Welcome() {
  const { userDetails } = useUserDetails();
  const { getGreeting, formatDate, currentTodos } = useGetGreeting();

  const name = userDetails?.name.split(" ");
  const firstName = name ? name[0] : "";

  return (
    <div className="flex flex-col md:gap-2 md:mb-10 mb-5">
      <h1 className="text-slate-800 md:text-5xl text-2xl font-semibold">
        {getGreeting()}, {firstName}
      </h1>
      <span className="text-slate-400 md:text-3xl text-lg">
        It's {formatDate()} - {`${currentTodos} tasks`}
      </span>
    </div>
  );
}
