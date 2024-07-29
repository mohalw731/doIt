// components/MessageList.tsx
import React from 'react';
import Message from './Message';

interface MessageListProps {
  messages: Array<{ text: string; isUser: boolean; }>;
  userAvatarUrl: string;
  aiAvatarUrl: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, userAvatarUrl, aiAvatarUrl }) => {
  return (
    <div className="flex-grow flex flex-col gap-3">
      {messages.map((message, index) => (
        <Message
          key={index}
          text={message.text}
          isUser={message.isUser}
          avatarUrl={message.isUser ? userAvatarUrl : aiAvatarUrl}
        />
      ))}
    </div>
  );
};

export default MessageList;
