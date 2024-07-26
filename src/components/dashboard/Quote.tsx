import {  EyeClosedIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import useGetDailyQuotes from "../../Hooks/useGetDailyQuotes";

export default function Quote() {

  const { quote, isOpen, setIsOpen } = useGetDailyQuotes();

  return (
    <div className={`flex flex-col items-center  ${!isOpen ? 'mb-5' : 'mb-5 md:mb-10'}`}>
    <div className={`md:text-2xl flex flex-col text-center items-center justify-start text-lg z-50 mb-1 ${!isOpen ? 'hidden' : 'visible'}`}>
      <h2 className="md:text-lg text-base text-slate-500">Quote of the day :</h2>
      <span className="text-slate-400">“{quote}”</span>
    </div>
    
    <span className="text-slate-600 btn btn-sm btn-ghost btn-circle flex items-center justify-center	" onClick={() => setIsOpen(!isOpen)}> {
        isOpen ? <EyeClosedIcon className="size-6" /> : <LightningBoltIcon className=" size-6" />
        }</span>
    </div>
  );
}
