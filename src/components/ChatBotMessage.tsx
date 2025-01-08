import React from 'react';
import { Bot, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ChatBotMessageProps {
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export const ChatBotMessage: React.FC<ChatBotMessageProps> = ({ content, isBot, timestamp }) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`flex max-w-[70%] items-start gap-2 rounded-lg px-4 py-2 ${
          isBot ? 'bg-gray-100' : 'bg-blue-600 text-white'
        }`}
      >
        {isBot && <Bot className="w-5 h-5 mt-1" />}
        {!isBot && <User className="w-5 h-5 mt-1" />}
        <div>
          <p className="text-sm">{content}</p>
          <span className="text-xs opacity-75 block mt-1">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
};