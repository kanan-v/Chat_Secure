import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';

interface ChatMessageProps {
  message: {
    content: string;
    sender: string;
    timestamp: string;
    read: boolean;
  };
  isOwn: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwn }) => {
  return (
    <div className={`flex items-end gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'} group`}>
      {/* Avatar - only show for received messages */}
      {!isOwn && (
        <div className="w-6 h-6 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mb-1">
          <span className="text-blue-600 text-xs font-semibold">JS</span>
        </div>
      )}
      
      <div className={`max-w-[60%] ${isOwn ? 'bg-black' : 'bg-gray-100'} rounded-3xl px-4 py-2 relative`}>
        {/* Message content */}
        <p className={`text-sm ${isOwn ? 'text-white' : 'text-gray-900'} font-normal`}>
          {message.content}
        </p>
        
        {/* Time and read status */}
        <div className={`flex items-center gap-1 mt-1 text-xs ${
          isOwn ? 'text-white/70' : 'text-gray-500'
        }`}>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </span>
          {isOwn && (
            <span className="ml-1">
              {message.read ? (
                <CheckCheck className="w-3 h-3" />
              ) : (
                <Check className="w-3 h-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};