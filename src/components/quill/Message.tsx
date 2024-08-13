// components/Message.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useUserDetails from '../../Functions/useUserDeatils';

interface MessageProps {
  text: string;
  isUser: boolean;
  avatarUrl: string;
}

const Message = ({ text, isUser, avatarUrl }:MessageProps) => {
  const { userDetails } = useUserDetails();
  const bageLetter = userDetails?.name.toUpperCase().substring(0, 1);
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex md:flex-row flex-col gap-2 items-start ${isUser ? "md:items-start items-end flex-col-reverse" : ""}`}>
        {isUser ? (
          <>
            <span
              className={`px-4 py-2 rounded-xl max-w-2xl bg-slate-600 text-white`}
              style={{ overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word" }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            </span>
            <span className="size-8 rounded-full bg-slate-300 items-center flex justify-center">{bageLetter} </span>
          </>
        ) : (
          <>
            <img src={avatarUrl} alt="AI avatar" className="size-8 rounded-full" />
            <span
              className={`py-2 px-4 rounded-xl max-w-2xl bg-transparent tracking-wide`}
              style={{ overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word" }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Message;
